import docs from './input-docs.mdx';

import templateInput from '../../examples/text_input/basic.html';
import templateInputWithHint from '../../examples/text_input/hint.html';
import templateInputOptionalField from '../../examples/text_input/optional.html';
import templateInputWithError from '../../examples/text_input/error.html';
import templateInputFixedWidths from '../../examples/text_input/fixed_widths.html';
import templateInputAdditionalAttributes from '../../examples/text_input/additional_attributes.html';
import templateInputType from '../../examples/text_input/type.html';
import templateInputValue from '../../examples/text_input/value.html';

export default {
  title: 'Forms/Input',
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

export const FixedWidths = () => templateInputFixedWidths;
FixedWidths.parameters = {
  docs: { source: { code: templateInputFixedWidths } },
};

export const Attributes = () => templateInputAdditionalAttributes;
Attributes.parameters = {
  docs: { source: { code: templateInputAdditionalAttributes } },
};

export const Type = () => templateInputType;
Type.parameters = {
  docs: { source: { code: templateInputType } },
};

export const Value = () => templateInputValue;
Value.parameters = {
  docs: { source: { code: templateInputValue } },
};
