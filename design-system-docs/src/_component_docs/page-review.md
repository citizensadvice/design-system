---
title: Page review
---

<%= render(Shared::ComponentExample.new(:page_review, :default)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:page_review, :default)) %>

### View Component Options

<%= render Shared::ArgumentsTable.new(:page_review) %>
