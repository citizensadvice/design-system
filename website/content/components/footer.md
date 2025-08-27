---
title: Footer
---

## Examples

### Default

<%= render(ExampleComponent.new(:footer, :default)) %>

### Minimal

<%= render(ExampleComponent.new(:footer, :minimal)) %>

### With text in a column

<%= render(ExampleComponent.new(:footer, :with_text)) %>

### With an additional logo

<%= render(ExampleComponent.new(:footer, :with_additional_logo)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(ExampleSourceComponent.new(:footer, :default)) %>

### Component arguments

The constructor accepts the following properties

<%= render ArgumentsTableComponent.new(:footer) %>

### Feedback link slot

The component accepts a `feedback_link` slot to render an optional feedback link. The slot accepts the following named arguments:

<%= render ArgumentsTableComponent.new(:footer_feedback_link_slot) %>

### Column slots

The component accepts up to four column slots. These can either be passed on at a time like in the example above, or by iterating through an array e.g.

```erb
<%%= render CitizensAdviceComponents::Footer.new do |c|
  c.with_columns(columns)
end %>
```

Each slot accepts the following named arguments:

<%= render ArgumentsTableComponent.new(:footer_column_slot) %>

### Legal summary slot

The component accepts `legal_summary` to render a customised text at the bottom of the footer. The slot requires a text string.

If the slot is not provided, the legal summary will display default text.

### Additional logo slot

The component accepts `additional_logo` to render additional content alongside the legal text in the footer. This is intended
for including additional regulator or other important logos, such as the Fundraising Regulator.
