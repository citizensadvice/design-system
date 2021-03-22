/* eslint-disable class-methods-use-this */
class ResizeObserver {
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element, options?: ResizeObserverOptions | undefined): void {
    // do nothing
  }

  unobserve(): void {
    // do nothing
  }

  disconnect(): void {
    // do nothing
  }
}

export default ResizeObserver;
