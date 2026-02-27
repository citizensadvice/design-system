---
title: Text input
---

Use this component when you want to collect textual or numerical data from a user that is not more than a single line.

## Examples

### Default

<%= render(ExampleComponent.new(:text_input, :default)) %>

### With hint text

Use hint text for help that’s relevant to the majority of users, based on the needs of your service.

<%= render(ExampleComponent.new(:text_input, :with_hint_text)) %>

### With error message

Error messages are used to highlight where users need to change information. They’re used together with an error summary

<%= render(ExampleComponent.new(:text_input, :with_error_message)) %>

### Fixed widths

Help users understand the purpose of the input by making the input size appropriate for the content it’s intended for.

<%= render(ExampleComponent.new(:text_input, :fixed_widths)) %>

### Page heading

<%= render(ExampleComponent.new(:text_input, :page_heading)) %>

## Implementation

- You must always have a `label` associated with the input element.
- Use the correct input `type` so the purpose of each input field can be determined.
- When collecting information about a user, use the `autocomplete` attribute to help users complete forms more quickly.

[Read more about input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html) at WCAG 2.1.

The following needs more research:

- The effects of `type=number` and `inputmode=numeric` on assistive technologies?
- Should we be able to group text inputs into fieldsets? Eg when capturing addresses?

## Using with Rails

When using with Rails we recommend using the form builder method provided by `CitizensAdviceComponents::FormBuilder`.

```rb
cads_text_field(attribute, **options)
```

The method works similarly to the default [`text_field` helper](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-text_field).

```erb
<%%= form_with model: @model, url: "/" do |form| %>
  <%%= form.cads_text_field(:example) %>
<%% end %>
```

With options:

```erb
<%%= form_with model: @model, url: "/" do |form| %>
  <%%= form.cads_text_field(
    :example,
    hint: "Example hint",
    required: true,
    width: :sixteen_chars,
    additional_attributes: { "data-testid": "example" }
  ) %>
<%% end %>
```

The method accepts the following optional parameters:

- `:label` - The text for the label associated with the input. Defaults to using translations.
- `:hint` - Hint text for the input
- `:required` - Boolean indicating the field is optional (i.e. not required)
- `:type` - Input type. Defaults to `:text`
- `:width` - Predefined width, one of: `:two_char`, `:four_char`, `:eight_char`, `:sixteen_char`
- `:page_heading` - Wraps the `<label>` in a `<h1>`
- `:additional_attributes` - Hash of additional attributes rendered onto the input, e.g. `{ autocomplete: "name" }`

### View component version

We also provide an older view component version of the component

<%= render(ExampleSourceComponent.new(:text_input, :view_component)) %>

<%= render ArgumentsTableComponent.new(:text_input) %>
