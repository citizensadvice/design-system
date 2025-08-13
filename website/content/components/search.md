---
title: Search
---

## Examples

### Default

<%= render(ExampleComponent.new(:search, :default)) %>

### With value

<%= render(ExampleComponent.new(:search, :with_value)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(ExampleSourceComponent.new(:search, :default)) %>

### Component arguments

<%= render ArgumentsTableComponent.new(:search) %>
