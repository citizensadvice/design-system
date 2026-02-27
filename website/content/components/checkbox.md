---
title: Checkbox
---

A single checkbox allows a user to affirm a statement or condition. Use a single checkbox when you want a user to confirm they have understood or agree to something. For example, showing the have read and understood some terms and conditions.

Do not use a checkbox if the user:

- should be able to select one or more choices from a list of options (use a [checkbox group](/components/checkbox-group) for this)
- should only be able to select one choice from a list of options (use a [radio group](/components/radio-group) for this)

## Examples

### Default

<%= render(ExampleComponent.new(:checkbox, :default)) %>

### With error message

Error messages are used to highlight where users need to change information. They’re used together with an [error summary](/components/error-summary).

<%= render(ExampleComponent.new(:checkbox, :with_error_message)) %>

## Using with Rails

When using with Rails we recommend using the form builder method provided by `CitizensAdviceComponents::FormBuilder`.

```rb
cads_checkbox(attribute, options = {})
```

The method works similarly to the default [`checkbox` helper](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-checkbox).

```erb
<%%= form_with model: @model, url: "/" do |form| %>
  <%%= form.cads_checkbox(:example) %>
<%% end %>
```

### View component version

We also provide an older view component version of the component

<%= render ExampleSourceComponent.new(:checkbox, :view_component) %>
<%= render ArgumentsTableComponent.new(:checkbox) %>
