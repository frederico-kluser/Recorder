// Jest setup file

// Mock performance object for Node.js environment
if (typeof performance === 'undefined') {
  global.performance = {
    now: () => Date.now(),
    mark: () => {},
    measure: () => {},
    clearMarks: () => {},
    clearMeasures: () => {},
    getEntriesByName: () => [],
    getEntriesByType: () => [],
    getEntries: () => [],
  };
}

// Mock chrome API for tests
global.chrome = {
  runtime: {
    lastError: null,
    id: 'test-extension-id',
  },
  tabs: {
    captureVisibleTab: jest.fn(),
    update: jest.fn(),
    get: jest.fn(),
  },
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    },
  },
};
