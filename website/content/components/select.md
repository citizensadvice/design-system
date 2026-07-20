---
title: Select
---

A select component allows the user to choose an option from a list which is displayed in a dropdown.

## Examples

### Default

<%= render(ExampleComponent.new(:select, :default)) %>

### With hint

<%= render(ExampleComponent.new(:select, :with_hint_text)) %>

### With error

<%= render(ExampleComponent.new(:select, :with_error)) %>

## When not to use

Do not use a select component when there are few options for the users to choose from.
In those cases an alternative could be the [radio group](/components/radio-group) component.

## Using with Rails

When using with Rails we recommend using the form builder method provided by `CitizensAdviceComponents::FormBuilder`.

```rb
cads_collection_select(attribute, collection, value_method, text_method, options = {}, html_options = {})
```

The method works similarly to the default [`collection_select` helper](https://api.rubyonrails.org/classes/ActionView/Helpers/FormOptionsHelper.html#method-i-collection_select).

```erb
<%%= form_with model: @model, url: "/" do |form| %>
  <%%= form.cads_collection_select(
    :example,
    [
      ["option_1", "Option 1"],
      ["option_2", "Option 2"],
      ["option_3", "Option 3"],
      ["option_4", "Option 4"],
      ["option_5", "Option 5"],
    ],
    :first,
    :last,
    hint: "Example hint text",
    required: true
  ) %>
<%% end %>
```

But this can also work with any collection:

```erb
<%%= form_with model: @model, url: "/" do |form| %>
  <%%= form.cads_collection_select(
    :example,
    Locations.all,
    :id,
    :name,
    hint: "Example hint text"
  ) %>
<%% end %>
```

The method accepts an `options` hash with the following optional parameters:

- `:label` - The text for the label associated with the input. Defaults to using translations.
- `:hint` - Hint text for the input
- `:required` - Boolean indicating the field is optional (i.e. not required)
