---
title: Navigation
---

<%= render(Shared::ComponentExample.new(:navigation, :default)) %>

The navigation is intended to be used alongside the header, although it works standalone, see the [header component docs](/components/header) for details on how to use the header component.

## JavaScript behaviour

The global navigation uses a "greedy" navigation pattern to allow as many links to be visible as possible. As the width of the viewport is restricted, navigation links fall into a collapsible section.

On mobile devices, any links that appear in the `.js-cads-copy-into-nav` element in the header are copied into the collapsible more section too.

If you plan to use this component you will need to initialise the following JavaScript:

```js
import { initGreedyNav } from '@citizensadvice/design-system';
initGreedyNav();
```

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:navigation, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:navigation) %>
