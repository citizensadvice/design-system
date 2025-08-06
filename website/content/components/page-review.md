---
title: Page review
---

<%= render(ExampleComponent.new(:page_review, :default)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(ExampleSourceComponent.new(:page_review, :default)) %>

### Component arguments

<%= render ArgumentsTableComponent.new(:page_review) %>
