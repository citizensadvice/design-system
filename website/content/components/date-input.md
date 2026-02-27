---
title: Date input
---

A date input field allows the user to enter a date they remember.

## Examples

### Default

<%= render(ExampleComponent.new(:date_input, :default)) %>

### With hint

<%= render(ExampleComponent.new(:date_input, :with_hint)) %>

### With error message

<%= render(ExampleComponent.new(:date_input, :with_error_message)) %>

### Page heading

<%= render(ExampleComponent.new(:date_input, :page_heading)) %>

## Using with Rails

When using with Rails we recommend using the form builder method provided by `CitizensAdviceComponents::FormBuilder`.

```erb
<%%= form_with model: @model, url: "/" do |form| %>
  <%%= form.cads_date_field(
    :date_of_birth,
    hint: "Example hint text",
    required: true
  ) %>
<%% end %>
```

The method accepts an `options` hash with the following optional parameters:

- `:label` - The text for the label associated with the input. Defaults to using translations.
- `:hint` - Hint text for the input
- `:required` - Boolean indicating the field is optional (i.e. not required)
- `:page_heading` - Wraps the `<legend>` in a `<h1>`

### View component version

We also provide an older view component version of the component

<%= render ExampleSourceComponent.new(:date_input, :view_component) %>
<%= render ArgumentsTableComponent.new(:date_input) %>
