import docs from './search-docs.mdx';
import templateDefault from './_search.html.haml';
import templateWithValue from './_search-with-value.html.haml';

export default {
  title: 'Components/Search',
  parameters: { docs: { page: docs } },
  decorators: [(Story) => `<div style="max-width: 800px">${Story()}</div>`],
};

export const Search = () => templateDefault;
templateDefault.parameters = {
  docs: { source: { code: templateDefault.toString() } },
};

export const SearchWithValue = () => templateWithValue;
SearchWithValue.parameters = {
  docs: { source: { code: templateWithValue.toString() } },
};
