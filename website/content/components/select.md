---
title: Select
---

A select component allows the user to choose an option from a list which is displayed in a dropdown.

## Examples

### Default

<%= render(ExampleComponent.new(:select, :default)) %>

### Optional

<%= render(ExampleComponent.new(:select, :optional)) %>

### With error

<%= render(ExampleComponent.new(:select, :with_error)) %>

### With hint

<%= render(ExampleComponent.new(:select, :with_hint_text)) %>

### With value

<%= render(ExampleComponent.new(:select, :with_value)) %>

## When not to use

Do not use a select component when there are few options for the users to choose from.
In those cases an alternative could be the [radio group](/components/radio-group) component.

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(ExampleSourceComponent.new(:select, :default)) %>

### Component arguments

<%= render ArgumentsTableComponent.new(:select) %>
