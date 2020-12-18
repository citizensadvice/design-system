import docs from './notice-banner-docs.mdx';
import templateExample from './_example.html.haml';
import { translate } from '../../story-helpers';

export default {
  title: 'Components/Notice banner',
  parameters: { docs: { page: docs } },
};

export const Example = (_, options) => translate(templateExample, options);
Example.parameters = { docs: { source: { code: templateExample.raw } } };
