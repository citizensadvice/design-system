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
