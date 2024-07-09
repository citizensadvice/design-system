---
title: Summary list
---

<%= render(Shared::ComponentExample.new(:summary_list, :default)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:summary_list, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:summary_list) %>
