import docs from './textarea-docs.mdx';

import templateInput from '../../examples/textarea/basic.html';
import templateInputWithHint from '../../examples/textarea/hint.html';
import templateInputOptionalField from '../../examples/textarea/optional.html';
import templateInputWithError from '../../examples/textarea/error.html';
import templateInputAdditionalAttributes from '../../examples/textarea/additional_attributes.html';
import templateInputValue from '../../examples/textarea/value.html';

export default {
  title: 'Forms/Textarea',
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

export const Value = () => templateInputValue;
Value.parameters = {
  docs: { source: { code: templateInputValue } },
};
