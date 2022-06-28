// Polyfill for closest
import 'element-closest/browser';

/**
 * Get fragment from URL
 *
 * Extract the fragment (everything after the hash) from a URL, but not including
 * the hash.
 * */
function getFragmentFromUrl(url: string) {
  if (url.indexOf('#') === -1) {
    return false;
  }

  return url.split('#').pop();
}

/**
 * Gets the associated label for inputs,
 * legend for fieldsets (checkboxes or radio groups)
 * or null if it cannot find either
 * */
function getAssociatedLegendOrLabel(input: HTMLElement) {
  const fieldset = input.closest('fieldset');

  if (fieldset) {
    const legends = fieldset.getElementsByTagName('legend');

    if (legends.length) {
      return legends[0];
    }
  }

  // If the element is not part of a fieldset (checkbox or radio), use the label
  return (
    document.querySelector(`label[for='${input.getAttribute('id')}']`) ||
    input.closest('label')
  );
}

/**
 * By default the target gets scrolled into view, however this hides the legend/label
 *
 * Manually handling the click event, scrolling the question into view and then
 * focussing the element solves this.
 * */
function focusTarget(target: Element) {
  if (target instanceof HTMLAnchorElement && target.href) {
    const inputId = getFragmentFromUrl(target.href) as string;
    const input = document.getElementById(inputId);

    if (!input) {
      return false;
    }

    const legendOrLabel = getAssociatedLegendOrLabel(input);
    if (!legendOrLabel) {
      return false;
    }

    legendOrLabel.scrollIntoView();
    input.focus({ preventScroll: true });

    return true;
  }

  return false;
}

export default function initErrorSummary(): void {
  const errorSummaryLinks = document.querySelectorAll('.js-error-summary-link');
  errorSummaryLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      if (focusTarget(link)) {
        e.preventDefault();
      }
    });
  });
}
