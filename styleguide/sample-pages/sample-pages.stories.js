import { pageDecorator, pageParameters } from './page-helpers';
import templateContent from '../examples/sample_pages/content-sample.html';
import templateForm from '../examples/sample_pages/form-sample.html';

export default {
  title: 'Sample pages/Examples',
  parameters: pageParameters,
  decorators: [pageDecorator],
};

export const ContentPage = () => templateContent.toString();
export const FormPage = () => templateForm.toString();
