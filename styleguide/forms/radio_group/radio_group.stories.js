import docs from './radio_group-docs.mdx';

import templateInput from '../../examples/radio_group/basic.html';
import templateInputWithHint from '../../examples/radio_group/hint.html';
import templateInputOptionalField from '../../examples/radio_group/optional.html';
import templateInputWithError from '../../examples/radio_group/error.html';
import templateInputAdditionalAttributes from '../../examples/radio_group/additional_attributes.html';
import templateInline from '../../examples/radio_group/inline.html';
import templateSmall from '../../examples/radio_group/small.html';
import templateLong from '../../examples/radio_group/long.html';

export default {
  title: 'Forms/Radio Group',
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

export const Inline = () => templateInline;
Inline.parameters = {
  docs: { source: { code: templateInline } },
};

export const Small = () => templateSmall;
Small.parameters = {
  docs: { source: { code: templateSmall } },
};

export const WithLongOptions = () => templateLong;
WithLongOptions.parameters = {
  docs: { source: { code: templateLong } },
};
