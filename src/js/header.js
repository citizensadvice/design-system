const initHeader = () => {
  const CLASS_NAMES = {
    showSearch: 'cads-header-show-search',
    iconSearch: 'cads-icon_search',
    iconClose: 'cads-icon_close',
  };

  const header = document.querySelector('.cads-header');
  const controlButton = header.querySelector('.cads-search-reveal');

  if (header && controlButton) {
    controlButton.addEventListener('click', () => {
      if (header.classList.contains(CLASS_NAMES.showSearch)) {
        header.classList.remove(CLASS_NAMES.showSearch);
        controlButton.classList.remove(CLASS_NAMES.iconClose);
        controlButton.classList.add(CLASS_NAMES.iconSearch);
        controlButton.setAttribute('aria-expanded', 'false');
        controlButton.title = 'Open search';
      } else {
        header.classList.add(CLASS_NAMES.showSearch);
        controlButton.classList.remove(CLASS_NAMES.iconSearch);
        controlButton.classList.add(CLASS_NAMES.iconClose);
        controlButton.setAttribute('aria-expanded', 'true');
        controlButton.title = 'Close search';
      }
    });
  } else {
    // eslint-disable-next-line no-console
    console.warn('Header: no search toggle button found');
  }
};

export default initHeader;
