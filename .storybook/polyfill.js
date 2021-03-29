require('url-polyfill');

const ResizeObserverPolyfill = require('resize-observer-polyfill').default;

if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserverPolyfill;
}
