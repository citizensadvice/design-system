---
title: On this page
---

## Examples

### With columns

By default the on this page component will display using a column based layout collapsing to a single column on small screens.

<%= render(Shared::ComponentExample.new(:on_this_page, :with_columns)) %>

### With no columns

If there are fewer than four link then the component will always display in a single column.

<%= render(Shared::ComponentExample.new(:on_this_page, :with_no_columns)) %>

### With nested links

The component supports a variant with nested links. In this configuration the component is always displayed in a single column with the option to expand nested links.

<%= render(Shared::ComponentExample.new(:on_this_page, :with_nested_links)) %>

## JavaScript behaviour

On this page requires some additional JavaScript behaviour which can be initialised with:

```js
import initOnThisPage from '@citizensadvice/design-system/lib/on-this-page/on-this-page';
initOnThisPage();
```

The JavaScript behaviour is only required if you are using the version of the component with nested links. If you are not using this you don't need to include this code.

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:on_this_page, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:on_this_page) %>

### Links slot

The on this page component accepts a required `links` slot. Links are an array of the following options:

<%= render Shared::ArgumentsTable.new(:on_this_page_links_slot) %>
