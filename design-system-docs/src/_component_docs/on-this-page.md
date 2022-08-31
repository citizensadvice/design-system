---
title: On this page
---

## Examples

### Default

<%= render(Shared::ComponentExample.new(:on_this_page, :default)) %>

### With nested links

<%= render(Shared::ComponentExample.new(:on_this_page, :with_nested_links)) %>

## JavaScript behaviour

On this page requires some additional JavaScript behaviour which can be initialised with:

```js
import initOnThisPage from '@citizensadvice/design-system/lib/on-this-page/on-this-page';
initOnThisPage();
```

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:on_this_page, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:on_this_page) %>

### Links slot

The on this page component accepts a required `links` slot. Links are an array of the following options:

<%= render Shared::ArgumentsTable.new(:on_this_page_links_slot) %>
