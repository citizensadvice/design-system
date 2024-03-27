export function debounce<Return>(fn: () => Return, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function callable(this: Return, ...args: []) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

export function getElementContentWidth(element: HTMLElement) {
  const styles = window.getComputedStyle(element);
  const padding =
    parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

  return element.clientWidth - padding;
}

export function getChildrenOffsetWidth(containerEl: HTMLElement) {
  // Adds a tolerance to account for alignment to the layout grid.
  const offsetPixels = -10;

  const children = containerEl.childNodes;

  let sum = 0;
  for (let i = 0; i < children.length; i++) {
    const child = <HTMLElement>children[i];

    if (child.nodeType !== 3 && !Number.isNaN(child.offsetWidth)) {
      sum += child.offsetWidth;
    }
  }

  return sum + offsetPixels;
}
