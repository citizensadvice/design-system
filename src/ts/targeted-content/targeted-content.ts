/**
 * Targeted content
 *
 * An accessible collabsible sections component
 * All JavaScript dependant behaviour is added within this componet,
 * allowing us to gracefully fallback to a simple heading and body
 * if this module fails to run or if JavaScript is disabled.
 *
 * @see https://inclusive-components.design/collapsible-sections/
 * @see https://github.com/alphagov/govuk-design-system/issues/1379
 * @see https://components.publishing.service.gov.uk/component-guide/step_by_step_nav/default/preview
 */
const SELECTORS = {
  el: '.js-cads-targeted-content',
  title: '.js-cads-targeted-content__title',
  content: '.js-cads-targeted-content__content',
};

const CLASS_NAMES = {
  noClose: 'cads-no-close',
  toggleable: 'cads-targeted-content--toggleable',
  open: 'cads-targeted-content--open',
  button: 'cads-targeted-content__button',
  closeButton: 'cads-targeted-content__close-button',
  icon: 'cads-targeted-content__icon',
  iconVertLine: 'cads-targeted-content__icon-vert',
};

function setState(el, state) {
  if (state === 'open') {
    el.classList.add(CLASS_NAMES.open);
  } else {
    el.classList.remove(CLASS_NAMES.open);
  }

  const titleEl = el.querySelector(SELECTORS.title);
  const btn = titleEl.querySelector('button');

  btn.setAttribute('aria-expanded', state === 'open' ? 'true' : 'false');
  btn.setAttribute(
    'aria-label',
    el.getAttribute(
      state === 'open'
        ? 'data-descriptive-label-hide'
        : 'data-descriptive-label-show'
    )
  );
}

function openByHash(hash) {
  try {
    const hashId = hash.replace(/^#/, '');
    const targetEl = document.getElementById(hashId);
    if (targetEl) {
      const matchEl = targetEl.closest(SELECTORS.el);
      if (matchEl) {
        setState(matchEl, 'open');
      }
    }
  } catch (e) {} // eslint-disable-line no-empty
}

function initTargetedContentFor(el) {
  const titleEl = el.querySelector(SELECTORS.title);
  const contentEl = el.querySelector(SELECTORS.content);

  /**
   * Create the toggle button
   *
   * The default component title is a plain heading,
   * we wrap the contents of the heading in our toggle button.
   *
   * We include an additional screen-reader-only label so the button
   * reads "Section title, show this section" or "Section title, hide this section"
   * for assistive devices based on the current state
   *
   * Follows the approach used in GOV.UK step-by-steps
   * @see https://components.publishing.service.gov.uk/component-guide/step_by_step_nav/default/preview
   *
   * The +/- icon is handled using inline SVG as this allows us
   * to use a single SVG and hide the appropriate path when open.
   * @see https://inclusive-components.design/collapsible-sections/
   */
  const createToggleButton = () => {
    titleEl.innerHTML = `<button class="${
      CLASS_NAMES.button
    }" aria-expanded="false" aria-controls="${contentEl.id}"
      aria-label="${el.getAttribute('data-descriptive-label-show')}">
        ${titleEl.innerHTML}
        <svg class="${
          CLASS_NAMES.icon
        }" viewBox="0 0 10 10" aria-hidden="true" focusable="false">
          <rect class="${
            CLASS_NAMES.iconVertLine
          }" height="8" width="2" y="1" x="4" />
          <rect height="2" width="8" y="4" x="1" />
        </svg>
      </button>`;
  };

  /**
   * Create the close button
   *
   * Like the toggle button we create this client-side so we can
   * fallback to a simple heading and body if this module fails
   * to run or if JavaScript is disabled.
   */
  const createCloseButton = () => {
    const ariaLabel = el.getAttribute('data-descriptive-label-hide');
    const closeButton = `<hr class="cads-separator" />
        <button aria-label="${ariaLabel}" class="cads-linkbutton ${
      CLASS_NAMES.closeButton
    }">
          ${el.getAttribute('data-close-label')}
        </button>`;

    contentEl.insertAdjacentHTML('beforeend', closeButton);
  };

  el.classList.add(CLASS_NAMES.toggleable);
  createToggleButton();

  const toggleButtonEl = el.querySelector(`.${CLASS_NAMES.button}`);

  toggleButtonEl.addEventListener('click', () => {
    const currentlyExpanded =
      toggleButtonEl.getAttribute('aria-expanded') === 'true' || false;

    setState(el, currentlyExpanded ? 'closed' : 'open');
  });

  if (!el.classList.contains(CLASS_NAMES.noClose)) {
    createCloseButton();
  }

  const closeButtonEl = contentEl.querySelector(`.${CLASS_NAMES.closeButton}`);

  if (closeButtonEl) {
    closeButtonEl.addEventListener('click', () => {
      const matchEl = closeButtonEl.closest(SELECTORS.el);
      if (matchEl) {
        setState(matchEl, 'closed');
      }

      const elTop = el.getBoundingClientRect().top;
      // scroll back to top of targeted content if it's out of viewport
      if (elTop < 0) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
}

export default function initTargetedContent(): void {
  const targetedContentEls = document.querySelectorAll(SELECTORS.el);
  if (targetedContentEls.length > 0) {
    for (let i = 0; i < targetedContentEls.length; i++) {
      const el = targetedContentEls[i];

      /**
       * Avoid initialising if already initialised
       * Guards against initTargetedContent being called more than once.
       */
      if (el.classList.contains(CLASS_NAMES.toggleable)) {
        return;
      }

      initTargetedContentFor(el);
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
  }
}
