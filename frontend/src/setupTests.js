import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = MockIntersectionObserver;
}

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});
