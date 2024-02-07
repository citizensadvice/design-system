---
title: Date input
---

A date input field allows the user to enter a date they remember.

## Examples

### Default

<%= render(Shared::ComponentExample.new(:date_input, :default)) %>

### Optional

<%= render(Shared::ComponentExample.new(:date_input, :optional)) %>

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

### With autocomplete

<%= render(Shared::ComponentExample.new(:date_input, :with_autocomplete)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:date_input, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:date_input) %>

### Date fields slot

The component requires a date fields slot. Usually there are three date fields - day, month and year.

<%= render Shared::ArgumentsTable.new(:date_field) %>
