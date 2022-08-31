---
title: Search
---

## Examples

### Default

<%= render(Shared::ComponentExample.new(:search, :default)) %>

### With value

<%= render(Shared::ComponentExample.new(:search, :with_value)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:search, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:search) %>
