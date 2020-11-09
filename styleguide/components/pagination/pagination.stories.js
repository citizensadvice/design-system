import docs from './pagination-docs.mdx';
import templateBasic from './_basic.html';
import templateManyPages from './_many-pages.html';
import templatePagingInfo from './_paging-info.html';

export default {
  title: 'Components/Pagination',
  parameters: { docs: { page: docs } },
};

export const Basic = () => templateBasic;
Basic.parameters = { docs: { source: { code: templateBasic.toString() } } };

export const ManyPages = () => templateManyPages;
ManyPages.parameters = {
  docs: { source: { code: templateManyPages.toString() } },
};

export const PagingInfo = () => templatePagingInfo;
PagingInfo.parameters = {
  docs: { source: { code: templatePagingInfo.toString() } },
};
