import docs from './breadcrumbs-docs.mdx';
import templateCollapsing from '../../examples/breadcrumbs/collapsing.html';
import templateLong from '../../examples/breadcrumbs/long.html';
import templateNotCollapsing from '../../examples/breadcrumbs/not_collapsing.html';
import templateNotFullWidth from '../../examples/breadcrumbs/not_full_width.html';
import templateNotOnCurrentPage from '../../examples/breadcrumbs/not_on_current_page.html';

export default {
  title: 'Components/Breadcrumbs',
  parameters: { docs: { page: docs } },
};

export const Collapsing = () => templateCollapsing;
Collapsing.parameters = { docs: { source: { code: templateCollapsing } } };

export const Long = () => templateLong;
Long.parameters = { docs: { source: { code: templateLong } } };

export const NotCollapsing = () => templateNotCollapsing;
NotCollapsing.parameters = {
  docs: { source: { code: templateNotCollapsing } },
};
export const NotFullWidth = () => templateNotFullWidth;
NotFullWidth.parameters = { docs: { source: { code: templateNotFullWidth } } };
export const NotOnCurrentPage = () => templateNotOnCurrentPage;
NotOnCurrentPage.parameters = {
  docs: { source: { code: templateNotOnCurrentPage } },
};
