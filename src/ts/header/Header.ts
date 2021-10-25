const initHeader = () => {
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

        const label = controlButton.getAttribute('data-descriptive-label-show');
        if (label) {
          controlButton.setAttribute('aria-label', label);
        }
      } else {
        header.classList.add(CLASS_NAMES.showSearch);
        controlButton.classList.remove(CLASS_NAMES.iconSearch);
        controlButton.classList.add(CLASS_NAMES.iconClose);
        controlButton.setAttribute('aria-expanded', 'true');

        const label = controlButton.getAttribute('data-descriptive-label-hide');
        if (label) {
          controlButton.setAttribute('aria-label', label);
        }
      }
    });
  }
};

export default initHeader;
