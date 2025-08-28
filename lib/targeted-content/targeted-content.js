/**
 * Targeted content
 *
 * An accessible collapsible sections component
 * All JavaScript dependant behaviour is added within this component,
 * allowing us to gracefully fallback to a simple heading and body
 * if this module fails to run or if JavaScript is disabled.
 *
 * @see https://inclusive-components.design/collapsible-sections/
 * @see https://github.com/alphagov/govuk-design-system/issues/1379
 * @see https://components.publishing.service.gov.uk/component-guide/step_by_step_nav/default/preview
 */
const SELECTORS = {
  el: ".js-cads-targeted-content",
  title: ".js-cads-targeted-content__title",
  content: ".js-cads-targeted-content__content",
};

const CLASS_NAMES = {
  noClose: "cads-no-close",
  toggleable: "cads-targeted-content--toggleable",
  open: "cads-targeted-content--open",
  button: "cads-targeted-content__button",
  closeButton: "cads-targeted-content__close-button",
  icon: "cads-targeted-content__icon",
};

function setState(el, state) {
  if (state === "open") {
    el.classList.add(CLASS_NAMES.open);
  } else {
    el.classList.remove(CLASS_NAMES.open);
  }

  const titleEl = el.querySelector(SELECTORS.title);
  const btn = titleEl.querySelector("button");

  btn.setAttribute("aria-expanded", state === "open" ? "true" : "false");
  const label = el.getAttribute(
    state === "open"
      ? "data-descriptive-label-hide"
      : "data-descriptive-label-show",
  );

  if (label) {
    btn.setAttribute("aria-label", label);
  }
}

function openByHash(hash) {
  try {
    const hashId = hash.replace(/^#/, "");
    const targetEl = document.getElementById(hashId);
    if (targetEl) {
      const matchEl = targetEl.closest(SELECTORS.el);
      if (matchEl) {
        setState(matchEl, "open");
      }
    }
  } catch (e) {} // eslint-disable-line no-empty
}

function initTargetedContentFor(el) {
  const titleEl = el.querySelector(SELECTORS.title);
  const contentEl = el.querySelector(SELECTORS.content);

  if (!(titleEl && contentEl)) {
    return;
  }

  /**
   * Create the toggle button
   *
   * The default component title is a plain heading,
   * we wrap the contents of the heading in our toggle button.
   *
   * We include an additional screen-reader-only label so the button
   * reads "Section title, show this section" or "Section title, close this section"
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
    titleEl.innerHTML = `<button type="button" class="${
      CLASS_NAMES.button
    }" aria-expanded="false" aria-controls="${contentEl.id}"
      aria-label="${el.getAttribute("data-descriptive-label-show")}">
        ${titleEl.innerHTML}
        <svg class="${
          CLASS_NAMES.icon
        }" viewBox="0 0 13 8" aria-hidden="true" focusable="false">
            <path d="M6.48281 4.73001L2.42281 0.725007C2.34309 0.645675 2.24165 0.591746 2.1313 0.570032C2.02095 0.548318 1.90664 0.559793 1.80281 0.603008C1.73411 0.631294 1.6716 0.672738 1.61881 0.725007L0.648807 1.68101C0.56999 1.75936 0.516221 1.85936 0.494323 1.96832C0.472425 2.07728 0.483382 2.19029 0.525806 2.29301C0.554732 2.36126 0.596874 2.42311 0.649806 2.47501L6.07981 7.83501C6.15945 7.91445 6.2609 7.96846 6.37127 7.99018C6.48165 8.0119 6.596 8.00035 6.69981 7.95701C6.76888 7.92888 6.83175 7.88743 6.88481 7.83501L12.3158 2.47501C12.3949 2.39684 12.4489 2.29689 12.471 2.1879C12.4931 2.0789 12.4822 1.9658 12.4398 1.86301C12.4109 1.79473 12.3688 1.73287 12.3158 1.68101L11.3458 0.725007C11.266 0.645789 11.1646 0.591939 11.0543 0.570231C10.9439 0.548522 10.8297 0.559926 10.7258 0.603008C10.6571 0.631294 10.5946 0.672738 10.5418 0.725007L6.48281 4.73001Z"/>
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
    const ariaLabel = el.getAttribute("data-descriptive-label-hide");
    const closeButton = `<hr class="cads-separator" />
        <button type="button" aria-label="${ariaLabel}" class="cads-linkbutton ${
          CLASS_NAMES.closeButton
        }">
          ${el.getAttribute("data-close-label")}
        </button>`;

    contentEl.insertAdjacentHTML("beforeend", closeButton);
  };

  el.classList.add(CLASS_NAMES.toggleable);
  createToggleButton();

  const toggleButtonEl = el.querySelector(`.${CLASS_NAMES.button}`);

  toggleButtonEl.addEventListener("click", () => {
    const currentlyExpanded =
      toggleButtonEl.getAttribute("aria-expanded") === "true" || false;

    setState(el, currentlyExpanded ? "closed" : "open");
  });

  if (!el.classList.contains(CLASS_NAMES.noClose)) {
    createCloseButton();
  }

  const closeButtonEl = contentEl.querySelector(`.${CLASS_NAMES.closeButton}`);

  if (closeButtonEl) {
    closeButtonEl.addEventListener("click", () => {
      const matchEl = closeButtonEl.closest(SELECTORS.el);
      if (matchEl) {
        setState(matchEl, "closed");
      }

      const elTop = el.getBoundingClientRect().top;
      // scroll back to top of targeted content if it's out of viewport
      if (elTop < 0) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }
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
    window.addEventListener("hashchange", () => {
      openByHash(window.location.hash);
    });
  }
}
