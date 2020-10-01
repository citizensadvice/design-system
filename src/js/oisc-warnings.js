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
        stickyEl.style.maxWidth = `${entry.target.offsetWidth}px`;
      } else if (entry.intersectionRatio === 1) {
        // fully intersects with screen
        stickyEl.style.maxWidth = null;
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

  /**
   * Account for anchor links
   * Add an offset using scroll-margin based on the reference height
   * of the first sticky warning on the page.
   * https://caniuse.com/?search=scroll-margin
   */
  if (sentryEls.length > 0) {
    // Take the height of the first sticky element as our reference;
    const referenceHeight = sentryEls[0].nextElementSibling.offsetHeight;
    const offset = referenceHeight + 10;

    // Add a scroll-margin to each heading element
    // @TODO: Is this the most appropriate selector to use?
    const headings = document
      .querySelector('main')
      .querySelectorAll('h2, h3, h4, h5, h6');

    for (let headingIndex = 0; headingIndex < headings.length; headingIndex++) {
      headings[headingIndex].style = `scroll-margin-top: ${offset}px`;
    }
  }
};

export default initOISCWarnings;
