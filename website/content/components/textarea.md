---
title: Textarea
---

## Examples

### Default

<%= render(ExampleComponent.new(:textarea, :default)) %>

### With hint

<%= render(ExampleComponent.new(:textarea, :with_hint)) %>

### With error message

<%= render(ExampleComponent.new(:textarea, :with_error_message)) %>

### With custom rows

<%= render(ExampleComponent.new(:textarea, :with_rows)) %>

### Page heading

<%= render(ExampleComponent.new(:textarea, :page_heading)) %>

## Using with Rails

When using with Rails we recommend using the form builder method provided by `CitizensAdviceComponents::FormBuilder`.

```rb
cads_text_area(attribute, **options)
```

The method works similarly to the default [`text_area` helper](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-text_area).

```erb
<%%= form_with model: @model, url: "/" do |form| %>
  <%%= form.cads_text_area(:example) %>
<%% end %>
```

With options:

```erb
<%%= form_with model: @model, url: "/" do |form| %>
  <%%= form.cads_text_area(
    :example,
    hint: "Example hint",
    required: true,
    rows: 5,
    additional_attributes: { "data-testid": "example" }
  ) %>
<%% end %>
```

The method accepts the following optional parameters:

- `:label` - The text for the label associated with the input. Defaults to using translations.
- `:hint` - Hint text for the input
- `:required` - Boolean indicating the field is optional (i.e. not required)
- `:rows` - The number of rows for the textarea. Defaults to `8`
- `:page_heading` - Wraps the `<label>` in a `<h1>`
- `:additional_attributes` - Hash of additional attributes rendered onto the input, e.g. `{ autocomplete: "name" }`

### View component version

We also provide an older view component version of the component

<%= render(ExampleSourceComponent.new(:textarea, :view_component)) %>

<%= render ArgumentsTableComponent.new(:textarea) %>
