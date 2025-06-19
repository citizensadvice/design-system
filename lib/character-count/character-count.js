function getMaxCountFor(inputEl) {
  // We don't use the maxlength attribute as:
  //
  // 1. This truncates text when pasting, causing data-loss
  // 2. Products may prefer to treat character counts as an
  //    enhancement, or to implement a slightly higher
  //    actual limit server side.
  //
  // https://adamsilver.io/blog/dont-use-the-maxlength-attribute-to-stop-users-from-exceeding-the-limit/
  const maxCountAttr = inputEl.getAttribute('data-character-count');
  const maxCount = maxCountAttr ? parseInt(maxCountAttr, 10) : Infinity;
  return maxCount;
}

function buildMessageFor(currentCount) {
  if (currentCount < 0) {
    return `You have ${Math.abs(currentCount)} characters too many`;
  } else {
    return `You have ${currentCount} ${currentCount === 1 ? 'character' : 'characters'} remaining`;
  }
}

function buildCounterEl(initialCount) {
  // Create a visible element which is live updated on every keystroke,
  // and a *screen reader* specific element which is updated less frequently.
  // https://dav-idc.com/making-a-character-count-component-more-accessible/
  return `<div class="cads-character-count js-cads-character-count-visible"
    aria-hidden=true data-testid="character-count"
  >
    ${buildMessageFor(initialCount)}
  </div>
  <div class="cads-character-count-sr cads-visually-hidden js-cads-character-count-sr"
    aria-live="polite"
  >
    ${buildMessageFor(initialCount)}
  </div>`;
}

function updateVisibleCountMessage(elementCache, maxCount) {
  const newCount = maxCount - (elementCache.input.value || '').length;
  elementCache.counterVisible.textContent = buildMessageFor(newCount);
  elementCache.counterVisible.setAttribute(
    'data-character-count-state',
    newCount < 0 ? 'invalid' : 'valid',
  );
}

function updateScreenReaderCountMessage(elementCache, maxCount) {
  const newCount = maxCount - (elementCache.input.value || '').length;
  elementCache.counterScreenReader.textContent = buildMessageFor(newCount);
}

function updateCountMessage(elementCache, maxCount) {
  updateVisibleCountMessage(elementCache, maxCount);
  updateScreenReaderCountMessage(elementCache, maxCount);
}

function updateIfValueChanged(elementCache, maxCount, lastInputValue) {
  if (elementCache.input.value !== lastInputValue) {
    lastInputValue = elementCache.input.value;
    updateCountMessage(elementCache, maxCount);
  }
}

function handleKeyup(elementCache, maxCount, lastInputTimestamp) {
  updateVisibleCountMessage(elementCache, maxCount);
  lastInputTimestamp = Date.now();
  return lastInputTimestamp;
}

function handleFocus(
  elementCache,
  maxCount,
  lastInputTimestamp,
  lastInputValue,
  valueChecker,
) {
  valueChecker = window.setInterval(() => {
    if (!lastInputTimestamp || Date.now() - 500 >= lastInputTimestamp) {
      updateIfValueChanged(elementCache, maxCount, lastInputValue);
    }
  }, 1000);

  return valueChecker;
}

// Cancel value checking on blur
function handleBlur(valueChecker) {
  if (valueChecker) {
    window.clearInterval(valueChecker);
  }
}

function init(inputEl) {
  let lastInputTimestamp, lastInputValue, valueChecker;

  // Base the parent on the closest form-field
  const parentEl = inputEl.closest('.cads-form-field');

  if (!parentEl) {
    return;
  }

  const maxCount = getMaxCountFor(inputEl);

  // Mark fallback character count text as visibly hidden
  // https://dav-idc.com/making-a-character-count-component-more-accessible/
  const fallback = parentEl.querySelector('.js-cads-character-count-fallback');
  fallback.classList.add('cads-visually-hidden');

  inputEl.insertAdjacentHTML('afterend', buildCounterEl(maxCount));

  const elementCache = {
    input: inputEl,
    fallback: parentEl.querySelector('.js-cads-character-count-fallback'),
    counterVisible: parentEl.querySelector('.js-cads-character-count-visible'),
    counterScreenReader: parentEl.querySelector('.js-cads-character-count-sr'),
  };

  //Attach event listeners to dynamically update remaining characters
  inputEl.addEventListener('keyup', () =>
    handleKeyup(elementCache, maxCount, lastInputTimestamp),
  );

  // // Bind focus/blur events to start/stop polling
  inputEl.addEventListener('focus', () =>
    handleFocus(
      elementCache,
      maxCount,
      lastInputTimestamp,
      lastInputValue,
      valueChecker,
    ),
  );

  inputEl.addEventListener('blur', () => handleBlur(valueChecker));

  // When the page is restored after navigating 'back' in some browsers the
  // state of form controls is not restored until *after* the DOMContentLoaded
  // event is fired, so we need to sync after the pageshow event.
  window.addEventListener('pageshow', () =>
    updateCountMessage(elementCache, maxCount),
  );

  // Initialize the character count
  updateCountMessage(elementCache, maxCount);
}

/**
 * Character counter component. Based on:
 * 1. https://github.com/alphagov/govuk-frontend/blob/main/packages/govuk-frontend/src/govuk/components/character-count/character-count.mjs
 * 2. https://dav-idc.com/making-a-character-count-component-more-accessible/
 * 3. https://adamsilver.io/blog/dont-use-the-maxlength-attribute-to-stop-users-from-exceeding-the-limit/
 */
export default function initCharacterCount() {
  const els = document.querySelectorAll('.js-cads-character-count');
  els.forEach((inputEl) => {
    init(inputEl);
  });
}
