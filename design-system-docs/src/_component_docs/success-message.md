---
title: Success message
---

<%= render(Shared::ComponentExample.new(:success_message, :default)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:success_message, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:success_message) %>
