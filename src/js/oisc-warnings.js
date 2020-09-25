export default initOISCWarnings = () => {
  const selectorClose = '.js-oisc-warning-close';

  const els = document.querySelectorAll(selectorClose);

  els.forEach((el) => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      el.closest('.js-oisc-warning').classList.remove('is-sticky');
    });
  });
};
