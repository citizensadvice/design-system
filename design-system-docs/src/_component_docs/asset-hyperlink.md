---
title: Asset hyperlink
---

<%= render(Shared::ComponentExample.new(:asset_hyperlink, :default)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:asset_hyperlink, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:asset_hyperlink) %>
