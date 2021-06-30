import docs from './navigation-docs.mdx';
import templateExample from '../../examples/navigation/example.html';
import greedyNav from '../../../src/ts/greedy-nav';

function decorateWithBehaviour(Story) {
  setTimeout(() => greedyNav.init());
  return Story();
}

function decorateTemplate(Story) {
  return `<div class="remove-margins">${Story()}</div>`;
}

export default {
  title: 'Components/Navigation',
  parameters: { docs: { page: docs } },
  decorators: [decorateWithBehaviour, decorateTemplate],
};

export const Default = () => templateExample;
Default.parameters = { docs: { source: { code: templateExample } } };
