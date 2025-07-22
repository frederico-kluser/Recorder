import { renderHook, act } from '@testing-library/react';
import { useExecutionNav } from '../../../src/pages/Popup/hooks/useExecutionNav';

describe('useExecutionNav', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // Mock window.location
    delete (window as any).location;
    window.location = { ...originalLocation, hash: '' };
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  it('should initialize with null selectedExecutionId', () => {
    const { result } = renderHook(() => useExecutionNav());

    expect(result.current.selectedExecutionId).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should read execution ID from URL hash on mount', () => {
    window.location.hash = '#exec=test-execution-123';

    const { result } = renderHook(() => useExecutionNav());

    expect(result.current.selectedExecutionId).toBe('test-execution-123');
  });

  it('should navigate to execution and update URL hash', () => {
    const { result } = renderHook(() => useExecutionNav());

    act(() => {
      result.current.navigateToExecution('new-execution-456');
    });

    expect(result.current.selectedExecutionId).toBe('new-execution-456');
    expect(window.location.hash).toBe('#exec=new-execution-456');
  });

  it('should navigate back and clear URL hash', () => {
    window.location.hash = '#exec=test-execution-123';
    const { result } = renderHook(() => useExecutionNav());

    expect(result.current.selectedExecutionId).toBe('test-execution-123');

    act(() => {
      result.current.navigateBack();
    });

    expect(result.current.selectedExecutionId).toBeNull();
    expect(window.location.hash).toBe('');
  });

  it('should update loading state', () => {
    const { result } = renderHook(() => useExecutionNav());

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });
});
