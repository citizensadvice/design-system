const forcePseudoState = require('./lib/forcePseudoState');

module.exports = async (page) => {
  await forcePseudoState({ page, selector: 'button', pseudoClass: 'active' });
};
