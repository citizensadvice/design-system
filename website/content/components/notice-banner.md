---
title: Notice banner
---

<%= render(ExampleComponent.new(:notice_banner, :default)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(ExampleSourceComponent.new(:notice_banner, :default)) %>

### Component arguments

<%= render ArgumentsTableComponent.new(:notice_banner) %>
