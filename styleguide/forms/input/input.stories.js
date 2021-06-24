import docs from './input-docs.mdx';

import templateInput from '../../examples/input/input_basic.html';
import templateInputWithHint from '../../examples/input/input_with_hint.html';
import templateInputOptional from '../../examples/input/input_optional.html';
import templateInputWithError from '../../examples/input/input_error.html';
import templateInputFixedWidths from '../../examples/input/input_fixed_widths.html';
import templateInputAdditionalAttributes from '../../examples/input/input_additional_attributes.html';
import templateInputType from '../../examples/input/input_type.html';

export default {
  title: 'Forms/Input',
  parameters: { docs: { page: docs } },
};

export const Input = () => templateInput;
Input.parameters = { docs: { source: { code: templateInput } } };

export const WithHint = () => templateInputWithHint;
WithHint.parameters = { docs: { source: { code: templateInputWithHint } } };

export const Optional = () => templateInputOptional;
Optional.parameters = { docs: { source: { code: templateInputOptional } } };

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
