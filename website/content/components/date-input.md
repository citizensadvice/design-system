---
title: Date input
---

A date input field allows the user to enter a date they remember.

## Examples

### Default

<%= render(ExampleComponent.new(:date_input, :default)) %>

### Optional

<%= render(ExampleComponent.new(:date_input, :optional)) %>

### Page heading

<%= render(ExampleComponent.new(:date_input, :page_heading)) %>

### With hint

<%= render(ExampleComponent.new(:date_input, :with_hint)) %>

### With error message

<%= render(ExampleComponent.new(:date_input, :with_error)) %>

### With incomplete error

<%= render(ExampleComponent.new(:date_input, :with_incomplete_error)) %>

### With validation error

<%= render(ExampleComponent.new(:date_input, :with_validation_error)) %>

### With values

<%= render(ExampleComponent.new(:date_input, :with_values)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(ExampleSourceComponent.new(:date_input, :default)) %>

### Component arguments

<%= render ArgumentsTableComponent.new(:date_input) %>
