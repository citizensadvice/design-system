---
title: Asset hyperlink
---

<%= render(Shared::ComponentExample.new(:asset_hyperlink, :example)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem you call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:asset_hyperlink, :example)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:asset_hyperlink) %>
