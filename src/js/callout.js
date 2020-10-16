const initCallouts = () => {
  const h2s = document.querySelectorAll('h2');
  const firstCallout = document.querySelector('.cads-callout');

  /**
   * Only run if we:
   * - Have a callout on the page
   * - Don't already have a h2
   */
  if (firstCallout && h2s.length === 0) {
    const h3ToReplace = firstCallout.querySelector('h3');
    const heading = h3ToReplace.innerHTML;
    const newHeading = document.createElement('h2');
    newHeading.innerHTML = heading;
    h3ToReplace.parentNode.replaceChild(newHeading, h3ToReplace);
  }
};

export default initCallouts;
