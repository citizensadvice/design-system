---
title: Success message
---

<%= render(ExampleComponent.new(:success_message, :default)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(ExampleSourceComponent.new(:success_message, :default)) %>

### Component arguments

<%= render ArgumentsTableComponent.new(:success_message) %>
