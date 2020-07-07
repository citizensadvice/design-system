/**
 * Provides backwards compatibility with IE 11.
 *
 * If we want to access the relatedTarget of an event we should use
 * a focusout event as per the spec, but in IE 11 we need to use blur.
 *
 * This constant should be used in place of focusout/blur when assigning
 * event handlers.
 */
const blurEventName = Object.prototype.hasOwnProperty.call(
    MouseEvent,
    'relatedTarget'
)
    ? 'focusout'
    : 'blur';

// this is here to stop eslint complaining
const somethingElse = 'somethingElse';

export { blurEventName, somethingElse };
