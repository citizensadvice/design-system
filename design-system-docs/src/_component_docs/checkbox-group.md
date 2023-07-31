---
title: Checkbox group
---

A checkbox group allows a user to select one or more options from a list of choices.

<%= render(Shared::ComponentExample.new(:checkbox_group, :default)) %>

## When to use

Use a checkbox group when a user can select one or more options from a list of choices.

## When not to use

Do not use a checkbox group if:

- the user should only be able to select one choice from a list of options (use a [radio group](/components/radio-group) for this)
- there is only one checkbox in the list of options, for example agreeing to terms and conditions (use [checkbox](/components/checkbox) for this)

## How it works

### With hint

Use hint text for help that’s relevant to the majority of users, based on the needs of your service.

<%= render(Shared::ComponentExample.new(:checkbox_group, :hint)) %>

### With optional field marker

If a selection is not required, use the optional marker.

<%= render(Shared::ComponentExample.new(:checkbox_group, :optional)) %>

### With error message

Error messages are used to highlight where users need to change information. They’re used together with an [error summary](/components/error-summary).

<%= render(Shared::ComponentExample.new(:checkbox_group, :error)) %>

### Additional attributes (View component only)

Any additional key/value pairs (beyond `label` and `value`) in your checkbox button definition will be added to the input.

<%= render(Shared::ComponentExample.new(:checkbox_group, :additional_attributes)) %>

### Checkbox ids (View component only)

The `id` attribute for each input will be automatically generated for you by the view component. They will take the form of:
`[name]-[index]`, where `[index]` is the position of the checkbox in the array passed into `c.with_inputs` above. eg `my-checkbox-0`, `my-checkbox-1`, etc.

## Implementation

You must always have a label associated with the input element.

The components we provide use wrap checkbox groups in a fieldset. In this context the 'label' is typically the fieldset legend, as every checkbox option is a label + input in its own right.

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:checkbox_group, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:checkbox_group) %>
