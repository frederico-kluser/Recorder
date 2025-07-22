export class TransactionLock {
  private static instance: TransactionLock;
  private locks: Map<string, Promise<void>> = new Map();

  private constructor() {}

  static getInstance(): TransactionLock {
    if (!TransactionLock.instance) {
      TransactionLock.instance = new TransactionLock();
    }
    return TransactionLock.instance;
  }

  async acquire(key: string): Promise<() => void> {
    while (this.locks.has(key)) {
      await this.locks.get(key);
    }

    let releaseLock: () => void;
    const lockPromise = new Promise<void>((resolve) => {
      releaseLock = () => {
        this.locks.delete(key);
        resolve();
      };
    });

    this.locks.set(key, lockPromise);
    return releaseLock!;
  }

  async withLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
    const release = await this.acquire(key);
    try {
      return await fn();
    } finally {
      release();
    }
  }
}
