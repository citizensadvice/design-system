import docs from './pagination-docs.mdx';
import templateExample from '../../examples/pagination/with_first_page.html';
import templatePagingInfo from './_paging-info.html';

export default {
  title: 'Components/Pagination',
  parameters: { docs: { page: docs } },
};

export const Example = () => templateExample;
Example.parameters = { docs: { source: { code: templateExample.toString() } } };

export const PagingInfo = () => templatePagingInfo;
PagingInfo.parameters = {
  docs: { source: { code: templatePagingInfo.toString() } },
};
