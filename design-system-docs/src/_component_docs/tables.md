---
title: Tables
---

<%= render(Shared::ComponentExample.new(:tables, :default)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:tables, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:tables) %>
