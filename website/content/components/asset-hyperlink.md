---
title: Asset hyperlink
---

<%= render(ExampleComponent.new(:asset_hyperlink, :default)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(ExampleSourceComponent.new(:asset_hyperlink, :default)) %>

### Component arguments

<%= render ArgumentsTableComponent.new(:asset_hyperlink) %>
