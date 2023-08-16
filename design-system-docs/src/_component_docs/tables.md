---
title: Tables
---

<%= render(Shared::ComponentExample.new(:tables, :default)) %>

## Variations

### Without responsive headers

By default the table component changes its structure on smaller devices. This adds the table heading text to each table cell.
This is useful for longer tables that have a lot of data, but it can be disabled for shorter tables using the `responsive_headers: false` argument.

<%= render(Shared::ComponentExample.new(:tables, :no_responsive_headers)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:tables, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:tables) %>
