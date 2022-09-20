---
title: Text input
---

Use this component when you want to collect textual or numerical data from a user that is not more than a single line.

## Examples

### Default

<%= render(Shared::ComponentExample.new(:text_input, :default)) %>

### With hint text

Use hint text for help that’s relevant to the majority of users, based on the needs of your service.

<%= render(Shared::ComponentExample.new(:text_input, :with_hint_text)) %>

### Optional

<%= render(Shared::ComponentExample.new(:text_input, :optional)) %>

### Fixed widths

Help users understand the purpose of the input by making the input size appropriate for the content it’s intended for.

<%= render(Shared::ComponentExample.new(:text_input, :fixed_widths)) %>

### With error message

Error messages are used to highlight where users need to change information. They’re used together with an error summary

<%= render(Shared::ComponentExample.new(:text_input, :with_error_message)) %>

### With value

<%= render(Shared::ComponentExample.new(:text_input, :with_value)) %>

### With custom type

<%= render(Shared::ComponentExample.new(:text_input, :with_custom_type)) %>

## Implementation

You must always have a `label` associated with the input element.

Use the correct input `type` so the purpose of each input field can be determined.

When collecting information about a user, use the `autocomplete` attribute to help users complete forms more quickly.

[Read more about input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html) at WCAG 2.1.

The following needs more research:

- The effects of `type=number` and `inputmode=numeric` on assistive technologies?
- Should we be able to group text inputs into fieldsets? Eg when capturing addresses?

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:text_input, :all_options)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:text_input) %>

### Additional type values

If you need access to inputs with additional type values, eg file or color, you can use the base `Input` view component instead. The interface is the same except you may not specify a width parameter.
