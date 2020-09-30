const initTargetedContent = () => {
  try {
    const pageContents = document.getElementsByClassName('cads-main-content');
    const pageContent = pageContents?.[0] ?? document;
    const content = pageContent.getElementsByClassName('cads-targeted-content');

    // Expand/collapse handlers for individual items
    for (let i = 0; i < content.length; i++) {
      const item = content[i];
      const summary = item.getElementsByClassName(
        'cads-targeted-content__summary'
      )[0];

      summary.addEventListener('click', () => {
        if (item.classList.contains('is-open')) {
          item.classList.remove('is-open');
          summary.setAttribute('aria-expanded', false);
        } else {
          item.classList.add('is-open');
          summary.setAttribute('aria-expanded', true);
        }
      });
      item
        .getElementsByClassName('cads-targeted-content__close-button')[0]
        .addEventListener('click', () => {
          item.classList.remove('is-open');
          summary.setAttribute('aria-expanded', false);
          item.open = false;
        });
    }

    // Print setup
    // eslint-disable-next-line
    window.addEventListener('beforeprint', () => {
      for (let i = 0; i < content.length; i++) {
        const item = content[i];
        const summary = item.getElementsByClassName(
          'cads-targeted-content__summary'
        )[0];
        if (!item.classList.contains('is-open')) {
          summary.click();
        }
      }
    });
  } catch (e) {
    console.warn(`Could not initialise targeted content ${e}`);
  }
};

export default initTargetedContent;
