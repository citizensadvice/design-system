import { translate } from '../../story-helpers';

import docs from './callouts-docs.mdx';
import templateStandard from './_standard.html.haml';
import templateExample from './_example.html.haml';
import templateImportant from './_important.html.haml';
import templateAdviser from './_adviser.html.haml';
import templateNested from './_nested.html.haml';

export default {
  title: 'Components/Callouts',
  parameters: { docs: { page: docs } },
};

export const Standard = (_, options) => translate(templateStandard, options);
Standard.storyName = 'Standard callout';
Standard.parameters = { docs: { source: { code: templateStandard.raw } } };

export const Example = (_, options) => translate(templateExample, options);
Example.storyName = 'Example callout';
Example.parameters = { docs: { source: { code: templateExample.raw } } };

export const Important = (_, options) => translate(templateImportant, options);
Important.storyName = 'Important callout';
Important.parameters = { docs: { source: { code: templateImportant.raw } } };

export const Adviser = (_, options) => translate(templateAdviser, options);
Adviser.storyName = 'Adviser callout';
Adviser.parameters = { docs: { source: { code: templateAdviser.raw } } };

export const Nested = (_, options) => translate(templateNested, options);
Nested.storyName = 'Nested callouts';
Nested.parameters = { docs: { source: { code: templateNested } } };
