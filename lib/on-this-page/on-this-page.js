function isExpanded(toggle) {
  const ariaExpanded = toggle.getAttribute("aria-expanded");
  return ariaExpanded === "true";
}

function setAriaExpanded(toggle, expanded) {
  toggle.setAttribute("aria-expanded", expanded.toString());
}

function setAriaDescription(toggle) {
  const ariaDescription = isExpanded(toggle)
    ? toggle.getAttribute("data-label-when-showing")
    : toggle.getAttribute("data-label-when-hiding");

  if (ariaDescription) {
    toggle.setAttribute("aria-label", ariaDescription);
  }
}

function setTargetState(toggle) {
  const parentEl = toggle.parentElement;
  const state = isExpanded(toggle) ? "open" : "closed";
  parentEl?.setAttribute("data-on-this-page-state", state);
}

function setIconClass(toggle) {
  const icon = toggle.querySelector(".cads-icon--plus-minus");
  icon?.classList.toggle("show-minus");
}

function initOnThisPageFor(component) {
  const toggles = component.querySelectorAll(".js-cads-on-this-page-toggle");

  for (let i = 0; i < toggles.length; i++) {
    const toggle = toggles[i];

    // Set status to false on load (in case not already set)
    // Makes calculating the other states easier as we can rely on the default
    setAriaExpanded(toggle, false);
    setAriaDescription(toggle);
    setTargetState(toggle);

    toggle.addEventListener("click", () => {
      setAriaExpanded(toggle, !isExpanded(toggle));
      setAriaDescription(toggle);
      setIconClass(toggle);
      setTargetState(toggle);
    });
  }
}

export default function initOnThisPage() {
  const components = document.querySelectorAll(".js-cads-on-this-page");
  for (let i = 0; i < components.length; i++) {
    initOnThisPageFor(components[i]);
  }
}
