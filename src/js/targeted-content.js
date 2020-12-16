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
  toggleable: 'cads-targeted-content--toggleable',
  open: 'cads-targeted-content--open',
  button: 'cads-targeted-content__button',
  titleText: 'cads-targeted-content__title-text',
  icon: 'cads-targeted-content__icon',
  iconVertLine: 'cads-targeted-content__icon-vert',
};

function setOpen(el) {
  el.classList.add(CLASS_NAMES.open);

  const btn = el.querySelector(SELECTORS.title).querySelector('button');
  btn.setAttribute('aria-expanded', 'true');
  btn.setAttribute(
    'aria-label',
    `${btn.textContent.trim()}, ${el.getAttribute(
      'data-descriptive-label-hide'
    )}`
  );
}

function setClosed(el) {
  el.classList.remove(CLASS_NAMES.open);

  const btn = el.querySelector(SELECTORS.title).querySelector('button');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute(
    'aria-label',
    `${btn.textContent.trim()}, ${el.getAttribute(
      'data-descriptive-label-show'
    )}`
  );
}

function openByHash(hash) {
  const targetEl = document.querySelector(hash);
  if (targetEl) {
    const matchEl = targetEl.closest(SELECTORS.el);
    if (matchEl) {
      setOpen(matchEl);
    }
  }
}

function initTargetedContentFor(el) {
  const title = el.querySelector(SELECTORS.title);
  const content = el.querySelector(SELECTORS.content);

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
    title.innerHTML = `<button class="${
      CLASS_NAMES.button
    }" aria-expanded="false" aria-controls="${content.id}"
      aria-label="${title.textContent.trim()}, ${el.getAttribute(
      'data-descriptive-label-show'
    )}">
        <div class="${CLASS_NAMES.titleText}">${title.innerHTML}</div>
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
    const closeButton = `<hr class="cads-separator"></hr>
        <button aria-label="${ariaLabel}" class="cads-linkbutton cads-targeted-content__close-button">
          ${el.getAttribute('data-close-label')}
        </button>`;

    content.insertAdjacentHTML('beforeend', closeButton);
  };

  el.classList.add(CLASS_NAMES.toggleable);
  createToggleButton();
  createCloseButton();

  const toggleButtonEl = el.querySelector('button');
  toggleButtonEl.addEventListener('click', () => {
    const currentlyExpanded =
      toggleButtonEl.getAttribute('aria-expanded') === 'true' || false;

    if (currentlyExpanded) {
      setClosed(el);
    } else {
      setOpen(el);
    }
  });

  const closeButtonEl = content.querySelector('button');
  closeButtonEl.addEventListener('click', () => {
    const matchEl = closeButtonEl.closest(SELECTORS.el);
    if (matchEl) {
      setClosed(matchEl);
    }
  });
}

export default function initTargetedContent() {
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
