---
title: Textarea
---

## Examples

### Default

<%= render(ExampleComponent.new(:textarea, :default)) %>

### Optional

<%= render(ExampleComponent.new(:textarea, :optional)) %>

### Page heading

<%= render(ExampleComponent.new(:textarea, :page_heading)) %>

### With hint

<%= render(ExampleComponent.new(:textarea, :with_hint)) %>

### With error message

<%= render(ExampleComponent.new(:textarea, :with_error_message)) %>

### With value

<%= render(ExampleComponent.new(:textarea, :with_value)) %>

### With custom id

By default the id is based on the `name`. This can be customised by passing an `id` argument.

<%= render(ExampleComponent.new(:textarea, :with_custom_id)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(ExampleSourceComponent.new(:textarea, :all_options)) %>

### Component arguments

<%= render ArgumentsTableComponent.new(:textarea) %>
