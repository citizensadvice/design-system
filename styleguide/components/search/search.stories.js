import docs from './search-docs.mdx';
import templateDefault from '../../examples/search/example.html';
import templateWithValue from '../../examples/search/with_value.html';

export default {
  title: 'Components/Search',
  parameters: { docs: { page: docs } },
  decorators: [(Story) => `<div style="max-width: 800px">${Story()}</div>`],
};

export const Search = () => templateDefault;
Search.parameters = {
  docs: { source: { code: templateDefault } },
};

export const SearchWithValue = () => templateWithValue;
SearchWithValue.parameters = {
  docs: { source: { code: templateWithValue } },
};
