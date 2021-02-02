import docs from './tables-docs.mdx';
import template from './_table.html.haml';
import { translate } from '../../story-helpers';

function decorateWithBehaviour(Story) {
  return Story();
}

export default {
  title: 'Components/Tables',
  parameters: { docs: { page: docs } },
  decorators: [decorateWithBehaviour],
};

export const Table = (_, options) => translate(template, options);
Table.parameters = { docs: { source: { code: template.raw } } };
