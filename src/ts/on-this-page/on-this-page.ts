import initShowHideWithToggle from './show-hide';

const initOnThisPage = (): void => {
  const onThisPageSelectors = {
    component: '.js-cads-on-this-page',
    toggle: '.js-cads-on-this-page__toggle',
  };

  const onThisPageClasses = {
    toggleWhenHidden: 'cads-icon_plus',
    toggleWhenShowing: 'cads-icon_minus',
    elementIsOpen: 'on-this-page__list--open',
  };

  const onThisPageAttributes = {
    labelWhenHidden: 'data-label-when-hiding',
    labelWhenShowing: 'data-label-when-showing',
    target: 'data-toggle-target-id',
  };

  initShowHideWithToggle(
    onThisPageSelectors,
    onThisPageClasses,
    onThisPageAttributes
  );
};

export default initOnThisPage;
