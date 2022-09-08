---
title: Notice banner
---

<%= render(Shared::ComponentExample.new(:notice_banner, :default)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:notice_banner, :default)) %>

### View Component Options

<%= render Shared::ArgumentsTable.new(:notice_banner) %>
