---
title: Date input
---

A date input field allows the user to enter a date they remember.

## Examples

### Default

<%= render(Shared::ComponentExample.new(:date_input, :default)) %>

### Optional

<%= render(Shared::ComponentExample.new(:date_input, :optional)) %>

### Page heading

<%= render(Shared::ComponentExample.new(:date_input, :page_heading)) %>

### With hint

<%= render(Shared::ComponentExample.new(:date_input, :with_hint)) %>

### With error message

<%= render(Shared::ComponentExample.new(:date_input, :with_error)) %>

### With incomplete error

<%= render(Shared::ComponentExample.new(:date_input, :with_incomplete_error)) %>

### With validation error

<%= render(Shared::ComponentExample.new(:date_input, :with_validation_error)) %>

### With values

<%= render(Shared::ComponentExample.new(:date_input, :with_values)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:date_input, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:date_input) %>
