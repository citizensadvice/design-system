---
title: Radio Group
---

A radio allows a user to select only one option from a group of exclusive choices and it is usually displayed in a radio group.

<%= render(Shared::ComponentExample.new(:radio_group, :default)) %>

## When not to use

Do not use a radio group if the userL

- should be able to select one or more choices from a list of options (use a checkbox group for this)
- there is only one checkbox in the list of options, for example agreeing to terms and conditions (use checkbox for this)

## How it works

### Inline

<%= render(Shared::ComponentExample.new(:radio_group, :inline)) %>

Use inline radios if there are only 2 options and the text is short.

### Stacked

<%= render(Shared::ComponentExample.new(:radio_group, :long)) %>

Use stacked radios if there are more than 2 options or the text is very long.

### With hint

Use hint text for help that’s relevant to the majority of users, based on the needs of your service.

<%= render(Shared::ComponentExample.new(:radio_group, :hint)) %>

### With optional field marker

<%= render(Shared::ComponentExample.new(:radio_group, :optional)) %>

### With error message

Error messages are used to highlight where users need to change information. They’re used together with an error summary.

<%= render(Shared::ComponentExample.new(:radio_group, :error)) %>

## Small radios

<%= render(Shared::ComponentExample.new(:radio_group, :small)) %>

Use standard radios in almost all cases. Use small radios to make them less visually prominent or on pages with lots of dense information, such as caseworking software. Small radios can be stacked or inline.

## Implementation

You must always have a label associated with the input element.

The components we provide use wrap radio groups in a fieldset. In this context the 'label' is typically the fieldset legend, as every radio option is a label + input in its own right.

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a following the example below.

The radio buttons themselves can be defined using a simple hash, and passed into the `RadioGroup` component like this:

```rb
- my_radio_buttons = [
  { label: "Option 1", value: "1", checked: true },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3", "data-testid": "my-test-id" }
]

= render CitizensAdviceComponents::RadioGroup.new(
    label: "Example radio buttons",
    name: "radio-buttons"
  ) do |c|
    c.inputs(my_radio_buttons)
  end
```

### Additional attributes (View component only)

Any additional key/value pairs (beyond `label` and `value`) in your radio button definition will be added to the input.

<%= render(Shared::ComponentExample.new(:radio_group, :additional_attributes)) %>

### With heading in the legend

Used for one question per page forms. Using similar approach to the one described in gov.uk - [Making labels and legends headings](https://design-system.service.gov.uk/get-started/labels-legends-headings/#legends-as-page-headings).

<%= render(Shared::ComponentExample.new(:radio_group, :legend_heading)) %>

### View Component Options

<%= render Shared::ArgumentsTable.new(:radio_group) %>
