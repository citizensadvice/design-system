import initOnThisPage from '../../../src/ts/on-this-page/on-this-page';

import docs from './on-this-page.mdx';
import templateDefault from '../../examples/on_this_page/example.html';
import templateMinimal from '../../examples/on_this_page/with_nested_links.html';

function decorateWithBehaviour(Story) {
  setTimeout(() => initOnThisPage());
  return Story();
}

export default {
  title: 'Components/On this page',
  parameters: { docs: { page: docs } },
  decorators: [decorateWithBehaviour],
};

export const Example = () => templateDefault;
Example.parameters = { docs: { source: { code: templateDefault } } };

export const WithNestedLinks = () => templateMinimal;
WithNestedLinks.parameters = { docs: { source: { code: templateMinimal } } };
