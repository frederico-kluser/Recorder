import { EventEmitter } from 'events';
import {
  BatchResult,
  BatchSummary,
  BatchConfig,
  BatchEvents,
  BatchRunnerState,
} from '../../types/batch';
import { RecordingMetadata } from '../../types/Recording';
import { ReplayEngine } from '../core/engine';
import { RecordingService as recordingService } from '../../pages/storage/recording-service';
import { ScreenshotService } from '../core/services/screenshot-service';

export class BatchRunner extends EventEmitter {
  private static instance: BatchRunner;
  private state: BatchRunnerState;
  private currentEngine?: ReplayEngine;
  private abortController?: AbortController;
  private hooks: BatchEvents = {};

  private constructor(config: BatchConfig) {
    super();
    this.state = {
      isRunning: false,
      isPaused: false,
      jobs: new Map(),
      config,
    };
  }

  static getInstance(config?: BatchConfig): BatchRunner {
    if (!BatchRunner.instance && config) {
      BatchRunner.instance = new BatchRunner(config);
    }
    return BatchRunner.instance;
  }

  async runAll(recordingIds?: string[]): Promise<BatchSummary> {
    if (this.state.isRunning) {
      throw new Error('Batch execution already in progress');
    }

    this.state.isRunning = true;
    this.state.jobs.clear();
    this.abortController = new AbortController();

    const startedAt = Date.now();
    const recordings = await this.loadRecordings(recordingIds);

    for (const recording of recordings) {
      this.state.jobs.set(recording.id, {
        id: recording.id,
        title: recording.title || recording.urlOriginal || recording.id,
        status: 'PENDING',
        stepsCompleted: 0,
        totalSteps: recording.actions?.length || 0,
      });
    }

    await this.persistState();
    await this.hooks.onBatchStart?.();

    const summary: BatchSummary = {
      total: recordings.length,
      passed: [],
      failed: [],
      running: 0,
      pending: recordings.length,
      startedAt,
    };

    for (const recording of recordings) {
      if (this.abortController.signal.aborted) {
        break;
      }

      try {
        await this.runSingleRecording(recording);
        const result = this.state.jobs.get(recording.id)!;

        if (result.status === 'PASSED') {
          summary.passed.push(recording.id);
        } else if (result.status === 'FAILED') {
          summary.failed.push({
            id: recording.id,
            title: result.title,
            error: result.error || 'Unknown error',
            screenshot: result.lastScreenshot,
          });
        }
      } catch (error) {
        await this.handleTestFailure(recording.id, error as Error);
        summary.failed.push({
          id: recording.id,
          title: recording.title || recording.id,
          error: (error as Error).message,
          screenshot: this.state.jobs.get(recording.id)?.lastScreenshot,
        });
      }

      summary.pending = Array.from(this.state.jobs.values()).filter(
        (job) => job.status === 'PENDING'
      ).length;
      summary.running = Array.from(this.state.jobs.values()).filter(
        (job) => job.status === 'RUNNING'
      ).length;
    }

    summary.endedAt = Date.now();
    summary.duration = summary.endedAt - summary.startedAt;

    this.state.isRunning = false;
    await this.persistState();
    await this.hooks.onBatchComplete?.(summary);

    this.logFormattedSummary(summary);
    return summary;
  }

  private async runSingleRecording(
    recording: RecordingMetadata
  ): Promise<void> {
    const job = this.state.jobs.get(recording.id)!;
    job.status = 'RUNNING';
    job.startedAt = Date.now();
    this.state.currentRecordingId = recording.id;

    await this.persistState();
    await this.hooks.onBeforeTest?.(recording.id);

    return new Promise((resolve, reject) => {
      const engine = new ReplayEngine();
      this.currentEngine = engine;

      const cleanup = () => {
        engine.removeAllListeners();
        this.currentEngine = undefined;
      };

      engine.on('actionFailed', async (error: Error, context: any) => {
        if (this.state.config.screenshotOnError) {
          try {
            const screenshot = await ScreenshotService.getInstance().capture(
              context.tabId
            );
            if (screenshot.success && screenshot.dataUrl) {
              job.lastScreenshot = this.compressScreenshot(screenshot.dataUrl);
            }
          } catch (err) {
            console.error('Failed to capture error screenshot:', err);
          }
        }
        job.error = error.message;
        job.status = 'FAILED';
      });

      engine.on('progress', (progress: number, currentStep: number) => {
        job.stepsCompleted = currentStep;
        this.persistState();
      });

      engine.on('completed', async () => {
        job.status = 'PASSED';
        job.endedAt = Date.now();
        job.duration = job.endedAt - job.startedAt!;
        await this.persistState();
        await this.hooks.onAfterTest?.(recording.id, job);
        cleanup();
        resolve();
      });

      engine.on('testFinished', async () => {
        job.status = 'PASSED';
        job.endedAt = Date.now();
        job.duration = job.endedAt - job.startedAt!;
        await this.persistState();
        await this.hooks.onAfterTest?.(recording.id, job);
        cleanup();
        resolve();
      });

      engine.on('error', async (error: Error) => {
        await this.handleTestFailure(recording.id, error);
        await this.hooks.onAfterTest?.(recording.id, job);
        cleanup();
        reject(error);
      });

      chrome.tabs.create(
        { url: recording.urlOriginal || recording.url },
        async (tab) => {
          if (!tab.id) {
            cleanup();
            reject(new Error('Failed to create tab'));
            return;
          }

          setTimeout(async () => {
            try {
              await engine.start(recording.id, tab.id);
            } catch (error) {
              cleanup();
              reject(error);
            }
          }, 2000);
        }
      );
    });
  }

  private async handleTestFailure(
    recordingId: string,
    error: Error
  ): Promise<void> {
    const job = this.state.jobs.get(recordingId);
    if (!job) return;

    job.status = 'FAILED';
    job.error = error.message;
    job.endedAt = Date.now();
    job.duration = job.endedAt - (job.startedAt || Date.now());

    await this.persistState();
    await this.hooks.onError?.(error);
  }

  private async loadRecordings(
    recordingIds?: string[]
  ): Promise<RecordingMetadata[]> {
    if (recordingIds?.length) {
      const recordings: RecordingMetadata[] = [];
      for (const id of recordingIds) {
        const recording = await recordingService.getRecording(id);
        if (recording) recordings.push(recording);
      }
      return recordings;
    }
    return recordingService.listRecordings();
  }

  private compressScreenshot(dataUrl: string): string {
    const maxSize = this.state.config.maxScreenshotSize;
    if (!dataUrl || dataUrl.length <= maxSize) return dataUrl;

    // Por enquanto, retornar apenas o dataUrl sem compressão
    // A implementação completa requer um ambiente DOM
    return dataUrl;
  }

  private async persistState(): Promise<void> {
    const stateData = {
      isRunning: this.state.isRunning,
      isPaused: this.state.isPaused,
      currentRecordingId: this.state.currentRecordingId,
      jobs: Array.from(this.state.jobs.entries()),
      config: this.state.config,
    };
    await chrome.storage.session.set({ batchRun: stateData });
  }

  private logFormattedSummary(summary: BatchSummary): void {
    const duration = summary.duration
      ? `${(summary.duration / 1000).toFixed(2)}s`
      : 'N/A';

    console.log(`
╔════════════════════════════════════════════════════════════╗
║                    BATCH EXECUTION SUMMARY                  ║
╠════════════════════════════════════════════════════════════╣
║ Total Tests: ${summary.total.toString().padEnd(45)}║
║ Duration: ${duration.padEnd(49)}║
╠════════════════════════════════════════════════════════════╣
║ ✅ PASSED: ${summary.passed.length.toString().padEnd(48)}║`);

    if (summary.passed.length > 0) {
      summary.passed.forEach((id) => {
        console.log(`║    • ${id.padEnd(53)}║`);
      });
    }

    console.log(`╠════════════════════════════════════════════════════════════╣
║ ❌ FAILED: ${summary.failed.length.toString().padEnd(48)}║`);

    if (summary.failed.length > 0) {
      summary.failed.forEach(({ id, error }) => {
        console.log(`║    • ${id.padEnd(53)}║`);
        console.log(`║      Error: ${error.substring(0, 45).padEnd(45)}║`);
      });
    }

    console.log(
      `╚════════════════════════════════════════════════════════════╝`
    );
  }

  abort(): void {
    this.abortController?.abort();
    this.currentEngine?.stop();
    this.state.isRunning = false;
    this.state.currentRecordingId = undefined;
  }

  pause(): void {
    if (this.state.isRunning && !this.state.isPaused) {
      this.state.isPaused = true;
      this.currentEngine?.pause();
    }
  }

  resume(): void {
    if (this.state.isRunning && this.state.isPaused) {
      this.state.isPaused = false;
      this.currentEngine?.resume();
    }
  }

  getState(): BatchRunnerState {
    return { ...this.state };
  }

  setHooks(hooks: BatchEvents): void {
    this.hooks = { ...hooks };
  }

  async restoreFromSession(): Promise<void> {
    const result = await chrome.storage.session.get('batchRun');
    if (result.batchRun) {
      const { jobs, ...rest } = result.batchRun;
      this.state = {
        ...this.state,
        ...rest,
        jobs: new Map(jobs),
      };
    }
  }

  async clearSession(): Promise<void> {
    await chrome.storage.session.remove('batchRun');
    this.state.jobs.clear();
    this.state.isRunning = false;
    this.state.isPaused = false;
    this.state.currentRecordingId = undefined;
  }
}
