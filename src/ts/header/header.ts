const initHeader = (): void => {
  const CLASS_NAMES = {
    showSearch: 'cads-header--show-search',
    iconSearch: 'cads-icon_search',
    iconClose: 'cads-icon_close',
  };

  const header = document.querySelector('.cads-header');

  if (header) {
    const controlButton = header.querySelector(
      '.js-cads-search-reveal'
    ) as HTMLButtonElement;

    controlButton.addEventListener('click', () => {
      if (header.classList.contains(CLASS_NAMES.showSearch)) {
        header.classList.remove(CLASS_NAMES.showSearch);
        controlButton.classList.remove(CLASS_NAMES.iconClose);
        controlButton.classList.add(CLASS_NAMES.iconSearch);
        controlButton.setAttribute('aria-expanded', 'false');

        const showLabel = controlButton.getAttribute(
          'data-descriptive-label-show'
        );
        if (showLabel) {
          controlButton.setAttribute('aria-label', showLabel);
        }
      } else {
        header.classList.add(CLASS_NAMES.showSearch);
        controlButton.classList.remove(CLASS_NAMES.iconSearch);
        controlButton.classList.add(CLASS_NAMES.iconClose);
        controlButton.setAttribute('aria-expanded', 'true');

        const hideLabel = controlButton.getAttribute(
          'data-descriptive-label-hide'
        );
        if (hideLabel) {
          controlButton.setAttribute('aria-label', hideLabel);
        }
      }
    });
  }
};

export default initHeader;
