const initTargetedContent = () => {
  const CLASS_NAMES = {
    isOpen: 'is-open',
  };

  function setOpen(el) {
    el.classList.add(CLASS_NAMES.isOpen);
    el.querySelector('summary').setAttribute('aria-expanded', 'true');
  }

  function forceOpen(el) {
    setOpen(el);
    // eslint-disable-next-line no-param-reassign
    el.open = true;
  }

  function setClosed(el) {
    el.classList.remove(CLASS_NAMES.isOpen);
    el.querySelector('summary').setAttribute('aria-expanded', 'false');
  }

  function forceClosed(el) {
    setClosed(el);
    // eslint-disable-next-line no-param-reassign
    el.open = false;
  }

  function openByHash(hash) {
    const targetEl = document.querySelector(hash);
    if (targetEl) {
      const closestDetailsEl = targetEl.closest('.cads-targeted-content');
      if (closestDetailsEl) {
        forceOpen(closestDetailsEl);
      }
    }
  }

  const targetedContentEls = document.querySelectorAll(
    '.cads-targeted-content'
  );

  if (targetedContentEls.length > 0) {
    for (let i = 0; i < targetedContentEls.length; i++) {
      const item = targetedContentEls[i];
      const summary = item.querySelector('summary');

      summary.addEventListener('click', () => {
        if (item.classList.contains(CLASS_NAMES.isOpen)) {
          setClosed(item);
        } else {
          setOpen(item);
        }
      });

      const closeButtonEl = item.querySelector(
        '.cads-targeted-content__close-button'
      );

      if (closeButtonEl) {
        closeButtonEl.addEventListener('click', () => {
          forceClosed(item);
        });
      }
    }

    /**
     * Toggle open matching targeted content if anchoring to or into it.
     */
    if (window.location.hash) {
      openByHash(window.location.hash);
    }

    window.addEventListener('hashchange', () => {
      openByHash(window.location.hash);
    });

    /**
     * Toggle open all targeted content elements if printing
     */
    window.addEventListener('beforeprint', () => {
      for (let i = 0; i < targetedContentEls.length; i++) {
        const item = targetedContentEls[i];
        forceOpen(item);
      }
    });
  }
};

export default initTargetedContent;
