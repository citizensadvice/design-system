import 'intersection-observer';

const initOISCWarnings = () => {
  const SELECTORS = {
    sentry: '.js-oisc-warning-sticky-sentry',
    closeButton: '.js-oisc-warning-close',
  };

  const STUCK_CLASS = 'is-stuck';

  /**
   * Uses a small sentry div just before the sticky element
   * combined with IntersectionObserver to determine when
   * an element gets fixed using position:sticky.
   * @see https://usefulangle.com/post/108/javascript-detecting-element-gets-fixed-in-css-position-sticky
   */
  const observer = new IntersectionObserver(
    ([entry]) => {
      const stickyEl = entry.target.nextElementSibling;

      if (entry.intersectionRatio === 0) {
        stickyEl.classList.add(STUCK_CLASS);
      } else if (entry.intersectionRatio === 1) {
        // fully intersects with screen
        stickyEl.classList.remove(STUCK_CLASS);
      }
    },
    { threshold: [0, 1] }
  );

  const sentryEls = document.querySelectorAll(SELECTORS.sentry);
  for (let index = 0; index < sentryEls.length; index++) {
    const sentryEl = sentryEls[index];
    const stickyEl = sentryEl.nextElementSibling;

    observer.observe(sentryEl);

    /**
     * Add event listeners for close buttons
     * Remove sticky behaviour on disclose.
     */
    stickyEl
      .querySelector(SELECTORS.closeButton)
      .addEventListener('click', (e) => {
        e.preventDefault();
        stickyEl.classList.remove('is-sticky');
        observer.unobserve(sentryEl);
      });
  }
};

export default initOISCWarnings;
