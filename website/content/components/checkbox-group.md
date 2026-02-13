---
title: Checkbox group
---

A checkbox group allows a user to select one or more options from a list of choices. Use a checkbox group when a user can select one or more options from a list of choices.

Do not use a checkbox group if:

- the user should only be able to select one choice from a list of options (use a [radio group](/components/radio-group) for this)
- there is only one checkbox in the list of options, for example agreeing to terms and conditions (use [checkbox](/components/checkbox) for this)

## Examples

### Default

<%= render(ExampleComponent.new(:checkbox_group, :default)) %>

### With hint

Use hint text for help that’s relevant to the majority of users, based on the needs of your service.

<%= render(ExampleComponent.new(:checkbox_group, :hint)) %>

### With error message

Error messages are used to highlight where users need to change information. They’re used together with an [error summary](/components/error-summary).

<%= render(ExampleComponent.new(:checkbox_group, :error_message)) %>

### Page heading

Used for one question per page forms. Using similar approach to the one described in gov.uk - [Making labels and legends headings](https://design-system.service.gov.uk/get-started/labels-legends-headings/#legends-as-page-headings).

<%= render(ExampleComponent.new(:checkbox_group, :page_heading)) %>

## Implementation

You must always have a label associated with the input element.

The components we provide use wrap checkbox groups in a fieldset. In this context the 'label' is typically the fieldset legend, as every checkbox option is a label + input in its own right.

## Using with Rails

When using with Rails we recommend using the form builder method provided by `CitizensAdviceComponents::FormBuilder`.

```rb
cads_collection_checkboxes(attribute, collection:, value_method:, text_method:, options = {})
```

The method works similarly to the default [`collection_checkboxes` helper](https://api.rubyonrails.org/classes/ActionView/Helpers/FormOptionsHelper.html#method-i-collection_checkboxes).

```erb
<%%= form_with model: @model, url: "/" do |form| %>
  <%%= form.cads_collection_checkboxes(
    :example,
    collection: [
      ["option_1", "Option 1"],
      ["option_2", "Option 2"],
      ["option_3", "Option 3"],
      ["option_4", "Option 4"],
      ["option_5", "Option 5"],
    ],
    text_method: :first,
    value_method: :last,
    hint: "Example hint text",
    required: true
  ) %>
<%% end %>
```

But this can also work with any collection:

```erb
<%%= form_with model: @model, url: "/" do |form| %>
  <%%= form.cads_collection_checkboxes(
    :example,
    collection: Locations.all,
    text_method: :id,
    value_method: :name,
    hint: "Example hint text"
  ) %>
<%% end %>
```

The `:value_method` and `:text_method` parameters are methods to be called on each member of `collection`. The return values are used as the value attribute and contents of each checkbox.

The method accepts an `options` hash with the following optional parameters:

- `:label` - The text for the label associated with the input. Defaults to using translations.
- `:hint` - Hint text for the input
- `:required` - Boolean indicating the field is optional (i.e. not required)
- `:page_heading` - Wraps the `<legend>` in a `<h1>`

### View component version

We also provide an older view component version of the component

<%= render ExampleSourceComponent.new(:checkbox_group, :view_component) %>
<%= render ArgumentsTableComponent.new(:checkbox_group) %>
