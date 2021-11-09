import docs from './checkbox-group-docs.mdx';

import templateInput from '../../examples/checkbox_group/basic.html';
import templateInputWithHint from '../../examples/checkbox_group/hint.html';
import templateInputOptionalField from '../../examples/checkbox_group/optional.html';
import templateInputWithError from '../../examples/checkbox_group/error.html';
import templateInputAdditionalAttributes from '../../examples/checkbox_group/additional_attributes.html';
import templateLong from '../../examples/checkbox_group/long.html';

export default {
  title: 'Forms/Checkbox Group',
  parameters: { docs: { page: docs } },
};

export const Basic = () => templateInput;
Basic.parameters = { docs: { source: { code: templateInput } } };

export const WithHint = () => templateInputWithHint;
WithHint.parameters = { docs: { source: { code: templateInputWithHint } } };

export const OptionalField = () => templateInputOptionalField;
OptionalField.parameters = {
  docs: { source: { code: templateInputOptionalField } },
};

export const WithError = () => templateInputWithError;
WithError.parameters = {
  docs: { source: { code: templateInputWithError } },
};

export const Attributes = () => templateInputAdditionalAttributes;
Attributes.parameters = {
  docs: { source: { code: templateInputAdditionalAttributes } },
};

export const WithLongOptions = () => templateLong;
WithLongOptions.parameters = {
  docs: { source: { code: templateLong } },
};
