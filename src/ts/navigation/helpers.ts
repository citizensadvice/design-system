export const BLUR_EVENT = Object.prototype.hasOwnProperty.call(
  MouseEvent,
  'relatedTarget',
)
  ? 'focusout'
  : 'blur';

export function debounce<Return>(fn: () => Return, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function callable(this: Return, ...args: []) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

export function parent(
  element: Nullable<HTMLElement>,
  parentNode: Nullable<Node>,
) {
  let el: Nullable<Node & ParentNode> = element;
  while (el !== null) {
    if (el.parentNode === parentNode) {
      return true;
    }
    el = el.parentNode;
  }
  return false;
}

export function relatedTarget(e: Nullable<FocusEvent>): Nullable<HTMLElement> {
  return <HTMLElement>e?.relatedTarget || document.activeElement;
}

export function getElementContentWidth(element: HTMLElement) {
  const styles = window.getComputedStyle(element);
  const padding =
    parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

  return element.clientWidth - padding;
}

function getChildrenWidth(e: HTMLElement) {
  const children = e.childNodes;
  let sum = 0;
  for (let i = 0; i < children.length; i++) {
    if (children[i].nodeType !== 3) {
      if (!Number.isNaN((<HTMLElement>children[i]).offsetWidth)) {
        sum += (<HTMLElement>children[i]).offsetWidth;
      }
    }
  }
  return sum;
}

export function getChildrenOffsetWidth(containerEl: HTMLElement) {
  // Adds a tolerance to account for alignment to the layout grid.
  const offsetPixels = -10;
  return getChildrenWidth(containerEl) + offsetPixels;
}
