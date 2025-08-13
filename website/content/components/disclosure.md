---
title: Disclosure
---

The disclosure component allows users to reveal more information or extra functionality only if they need it.

## When to use

To hide functionality that most users will not use.

## When not to use

The disclosure component should not be used just to declutter an interface.

If you have functionality that a lot of users will need, the options should not be hidden as a lot of users will miss it. (For example the 'This advice applies to' switcher at the top of advice pages now lists all nations as most users missed the drop-down that was there before.)

## Examples

### Default

<%= render(ExampleComponent.new(:disclosure, :default)) %>

### With open summary

<%= render(ExampleComponent.new(:disclosure, :with_open_summary)) %>

### With custom ID

<%= render(ExampleComponent.new(:disclosure, :with_custom_id)) %>

By default, the disclosure details id is generated based on the closed label. Adding a custom id is useful in the cases where there are more than one disclosure per page and it is possible that multiple disclosures would have the same label.

## JavaScript behaviour

Targeted content requires some additional JavaScript behaviour which can be initialised with:

```js
import { initDisclosure } from "@citizensadvice/design-system";
initDisclosure();
```

If JavaScript either fails or is disabled in the users browser the fallback is to show the content as open. Try disabling JavaScript in your browser and reloading this page to see this in action.

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(ExampleSourceComponent.new(:disclosure, :default)) %>

### Component arguments

The component requires a content block for the main contents along with the following arguments:

<%= render ArgumentsTableComponent.new(:disclosure) %>
