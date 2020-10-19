const initTargetedContent = () => {
  const CLASS_NAMES = {
    isOpen: 'is-open',
  };

  const pageContents = document.querySelector('.cads-main-content') || document;
  const targetedContentEls = pageContents.querySelectorAll(
    '.cads-targeted-content'
  );

  if (targetedContentEls.length > 0) {
    for (let i = 0; i < targetedContentEls.length; i++) {
      const item = targetedContentEls[i];
      const summary = item.querySelector('summary');

      summary.addEventListener('click', () => {
        if (item.classList.contains(CLASS_NAMES.isOpen)) {
          item.classList.remove(CLASS_NAMES.isOpen);
          summary.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add(CLASS_NAMES.isOpen);
          summary.setAttribute('aria-expanded', 'true');
        }
      });

      const closeButtonEl = item.querySelector(
        '.cads-targeted-content__close-button'
      );

      if (closeButtonEl) {
        closeButtonEl.addEventListener('click', () => {
          item.classList.remove(CLASS_NAMES.isOpen);
          summary.setAttribute('aria-expanded', 'false');
          item.open = false;
        });
      }
    }

    /**
     * Toggle open all targeted content elements if printing
     */
    window.addEventListener('beforeprint', () => {
      for (let i = 0; i < targetedContentEls.length; i++) {
        const item = targetedContentEls[i];
        const summary = item.querySelector('summary');
        if (!item.classList.contains('is-open')) {
          summary.click();
        }
      }
    });
  }
};

export default initTargetedContent;
