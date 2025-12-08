function getMaxCountFor(inputEl) {
  // We don't use the maxlength attribute as:
  //
  // 1. This truncates text when pasting, causing data-loss
  // 2. Products may prefer to treat character counts as an
  //    enhancement, or to implement a slightly higher
  //    actual limit server side.
  //
  // https://adamsilver.io/blog/dont-use-the-maxlength-attribute-to-stop-users-from-exceeding-the-limit/
  const maxCountAttr = inputEl.getAttribute("data-character-count");
  const maxCount = maxCountAttr ? parseInt(maxCountAttr, 10) : Infinity;
  return maxCount;
}

function getI18nFor(inputEl) {
  const getData = (name) =>
    inputEl.getAttribute(`data-character-count-${name}`);

  return {
    overLimit:
      getData("over-limit") || "You have CHARACTER_COUNT characters too many",
    remainingZero:
      getData("remaining-zero") || "You have 0 characters remaining",
    remainingOne: getData("remaining-one") || "You have 1 character remaining",
    remainingOther:
      getData("remaining-other") ||
      "You have CHARACTER_COUNT character remaining",
  };
}

function buildMessageFor(elementCache, currentCount) {
  if (currentCount < 0) {
    return elementCache.i18n.overLimit.replace(
      "CHARACTER_COUNT",
      Math.abs(currentCount),
    );
  }

  if (currentCount === 0) {
    return elementCache.i18n.remainingZero;
  }

  if (currentCount === 1) {
    return elementCache.i18n.remainingOne;
  }

  return elementCache.i18n.remainingOther.replace(
    "CHARACTER_COUNT",
    currentCount,
  );
}

function buildCounterEl() {
  // Create a visible element which is live updated on every keystroke,
  // and a *screen reader* specific element which is updated less frequently.
  // https://dav-idc.com/making-a-character-count-component-more-accessible/
  return `<div class="cads-character-count js-cads-character-count-visible"
    aria-hidden=true data-testid="character-count"
  ></div>
  <div class="cads-character-count-sr cads-visually-hidden js-cads-character-count-sr"
    aria-live="polite"
  ></div>`;
}

function updateVisibleCountMessage(elementCache, maxCount) {
  const newCount = maxCount - (elementCache.input.value || "").length;
  elementCache.counterVisible.textContent = buildMessageFor(
    elementCache,
    newCount,
  );
  elementCache.counterVisible.setAttribute(
    "data-character-count-state",
    newCount < 0 ? "invalid" : "valid",
  );
}

function updateScreenReaderCountMessage(elementCache, maxCount) {
  const newCount = maxCount - (elementCache.input.value || "").length;
  elementCache.counterScreenReader.textContent = buildMessageFor(
    elementCache,
    newCount,
  );
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
  const parentEl = inputEl.closest(".cads-form-field");

  if (!parentEl) {
    return;
  }

  const maxCount = getMaxCountFor(inputEl);

  // Mark fallback character count text as visibly hidden
  // https://dav-idc.com/making-a-character-count-component-more-accessible/
  const fallback = parentEl.querySelector(".js-cads-character-count-fallback");
  fallback.classList.add("cads-visually-hidden");

  inputEl.insertAdjacentHTML("afterend", buildCounterEl());

  const elementCache = {
    input: inputEl,
    i18n: getI18nFor(inputEl),
    fallback: parentEl.querySelector(".js-cads-character-count-fallback"),
    counterVisible: parentEl.querySelector(".js-cads-character-count-visible"),
    counterScreenReader: parentEl.querySelector(".js-cads-character-count-sr"),
  };

  //Attach event listeners to dynamically update remaining characters
  inputEl.addEventListener("keyup", () =>
    handleKeyup(elementCache, maxCount, lastInputTimestamp),
  );

  // // Bind focus/blur events to start/stop polling
  inputEl.addEventListener("focus", () =>
    handleFocus(
      elementCache,
      maxCount,
      lastInputTimestamp,
      lastInputValue,
      valueChecker,
    ),
  );

  inputEl.addEventListener("blur", () => handleBlur(valueChecker));

  // When the page is restored after navigating 'back' in some browsers the
  // state of form controls is not restored until *after* the DOMContentLoaded
  // event is fired, so we need to sync after the pageshow event.
  window.addEventListener("pageshow", () =>
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
  const els = document.querySelectorAll(".js-cads-character-count");
  els.forEach((inputEl) => {
    init(inputEl);
  });
}
