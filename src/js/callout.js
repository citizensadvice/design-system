const initCallouts = () => {
  try {
    const h2s = document.getElementsByTagName('h2');
    if (!h2s || !h2s.length) {
      // Only do this if we don't have an H2 in the page
      const callouts = document.getElementsByClassName('cads-callout');
      if (callouts && callouts.length > 0) {
        const callout = callouts[0];
        const h3ToReplace = callout.getElementsByTagName('h3')[0];
        const heading = h3ToReplace.innerHTML;
        const newHeading = document.createElement('h2');
        newHeading.innerHTML = heading;
        h3ToReplace.parentNode.replaceChild(newHeading, h3ToReplace);
      }
    }
  } catch (e) {
    console.log(`Could not initialise callouts ${e}`);
  }
};

export default initCallouts;
