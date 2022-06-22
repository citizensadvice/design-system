const initHeader = (): void => {
  const SELECTOR = '.js-cads-search-reveal';
  const SHOW_SEARCH_CLASS_NAME = 'cads-header--show-search';

  const header = document.querySelector('.cads-header');

  if (header) {
    const controlButton = header.querySelector(SELECTOR) as HTMLButtonElement;

    const setClosed = () => {
      header.classList.remove(SHOW_SEARCH_CLASS_NAME);
      controlButton.setAttribute('aria-expanded', 'false');

      const showLabel = controlButton.getAttribute(
        'data-descriptive-label-show'
      );
      if (showLabel) {
        controlButton.setAttribute('aria-label', showLabel);
      }
    };

    const setOpen = () => {
      header.classList.add(SHOW_SEARCH_CLASS_NAME);
      controlButton.setAttribute('aria-expanded', 'true');

      const hideLabel = controlButton.getAttribute(
        'data-descriptive-label-hide'
      );
      if (hideLabel) {
        controlButton.setAttribute('aria-label', hideLabel);
      }
    };

    // Set initial control state on init
    setClosed();

    controlButton.addEventListener('click', () => {
      if (header.classList.contains(SHOW_SEARCH_CLASS_NAME)) {
        setClosed();
      } else {
        setOpen();
      }
    });
  }
};

export default initHeader;
