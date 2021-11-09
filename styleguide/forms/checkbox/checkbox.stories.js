import docs from './checkbox-docs.mdx';

import templateInput from '../../examples/checkbox_single/basic.html';
import templateInputWithError from '../../examples/checkbox_single/error.html';

export default {
  title: 'Forms/Checkbox',
  parameters: { docs: { page: docs } },
};

export const Basic = () => templateInput;
Basic.parameters = { docs: { source: { code: templateInput } } };

export const WithError = () => templateInputWithError;
WithError.parameters = {
  docs: { source: { code: templateInputWithError } },
};
