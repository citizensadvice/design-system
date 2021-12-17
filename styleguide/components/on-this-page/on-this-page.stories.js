import initOnThisPage from '../../../src/ts/on-this-page/on-this-page';

import docs from './on-this-page.mdx';
import templateExample from '../../examples/on_this_page/example.html';
import templateWithNestedLinks from '../../examples/on_this_page/with_nested_links.html';

function decorateWithBehaviour(Story) {
  setTimeout(() => initOnThisPage());
  return Story();
}

export default {
  title: 'Components/On this page',
  parameters: { docs: { page: docs } },
};

export const Example = () => templateExample;
Example.parameters = { docs: { source: { code: templateExample } } };

export const WithNestedLinks = () => templateWithNestedLinks;
WithNestedLinks.parameters = { docs: { source: { code: templateWithNestedLinks } } };
WithNestedLinks.decorators = [decorateWithBehaviour];
