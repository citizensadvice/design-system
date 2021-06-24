import docs from './input-docs.mdx';

import templateInput from '../../examples/text_input/text_input_basic.html';
import templateInputWithHint from '../../examples/text_input/text_input_with_hint.html';
import templateInputOptionalField from '../../examples/text_input/text_input_optional.html';
import templateInputWithError from '../../examples/text_input/text_input_error.html';
import templateInputFixedWidths from '../../examples/text_input/text_input_fixed_widths.html';
import templateInputAdditionalAttributes from '../../examples/text_input/text_input_additional_attributes.html';
import templateInputType from '../../examples/text_input/text_input_type.html';

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
