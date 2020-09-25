const initOISCWarnings = () => {
  const supportsInterSectionObserver =
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype;

  /**
   * Uses a small sentry div just before the sticky element
   * combined with IntersectionObserver to determine when
   * an element gets fixed using position:sticky.
   * @see https://usefulangle.com/post/108/javascript-detecting-element-gets-fixed-in-css-position-sticky
   */
  if (supportsInterSectionObserver) {
    const sentryEls = document.querySelectorAll(
      '.js-oisc-warning-sticky-sentry'
    );

    const stuckClass = 'is-stuck';

    const observer = new IntersectionObserver(
      ([entry]) => {
        const stickyEl = entry.target.nextElementSibling;

        if (entry.intersectionRatio === 0) {
          stickyEl.classList.add(stuckClass);
        } else if (entry.intersectionRatio === 1) {
          // fully intersects with screen
          stickyEl.classList.remove(stuckClass);
        }
      },
      { threshold: [0, 1] }
    );

    for (let index = 0; index < sentryEls.length; index++) {
      const element = sentryEls[index];
      observer.observe(element);
    }
  }

  const els = document.querySelectorAll(
    '.js-oisc-warning.is-sticky .js-oisc-warning-close'
  );

  for (let index = 0; index < els.length; index++) {
    const el = els[index];
    const parentEl = el.closest('.js-oisc-warning');
    el.addEventListener('click', (e) => {
      e.preventDefault();
      parentEl.classList.remove('is-sticky');
    });
  }
};

export default initOISCWarnings;
