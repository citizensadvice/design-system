// https://github.com/puppeteer/puppeteer/issues/4057#issuecomment-466584919
module.exports = async function forcePseudoState({
  page,
  selector,
  pseudoClass,
} = {}) {
  const cdp = await page.target().createCDPSession();
  const docNodeId = (await cdp.send('DOM.getDocument')).root.nodeId;
  const { nodeId } = await cdp.send('DOM.querySelector', {
    nodeId: docNodeId,
    selector,
  });

  await cdp.send('CSS.enable');
  await cdp.send('CSS.forcePseudoState', {
    nodeId,
    forcedPseudoClasses: [pseudoClass],
  });
};
