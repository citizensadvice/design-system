import { pageDecorator, pageParameters } from '../page-helpers';
import templateTables from './_tables.html.haml';
import templateForms from './_forms.html.haml';

export default {
  title: 'Sample pages/Generic',
  parameters: pageParameters,
  decorators: [pageDecorator],
};

export const tables = () => templateTables;
export const forms = () => templateForms;
