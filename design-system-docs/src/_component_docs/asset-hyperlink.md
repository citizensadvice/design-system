---
title: Asset hyperlink
---

<%= render(Shared::ComponentExample.new(:asset_hyperlink, :default)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

```rb
<%%= render(
  CitizensAdviceComponents::AssetHyperlink.new(
    href: "https://example.com",
    description: "Test PDF",
    size: 6_444_516
  )
  end
%>
```

### View Component Options

<%= render Shared::ArgumentsTable.new(:asset_hyperlink) %>
