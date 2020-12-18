import { translate } from '../../story-helpers';
import docs from './search-docs.mdx';
import templateDefault from './_search.html.haml';
import templateWithValue from './_search-with-value.html.haml';

export default {
  title: 'Components/Search',
  parameters: { docs: { page: docs } },
  decorators: [(Story) => `<div style="max-width: 800px">${Story()}</div>`],
};

export const Search = (_, options) => translate(templateDefault, options);
templateDefault.parameters = {
  docs: { source: { code: templateDefault.toString() } },
};

export const SearchWithValue = (_, options) =>
  translate(templateWithValue, options);
SearchWithValue.parameters = {
  docs: { source: { code: templateWithValue.toString() } },
};
