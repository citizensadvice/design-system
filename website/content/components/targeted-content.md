---
title: Targeted content
---

The targeted content component allows users to show and hide sections of related content on a page. It can help users scan and process content on a page more effectively.

However, it does hide content from users and it can be easy for users to miss. When using it, you should aim to use **no more than 6** and you shouldn’t have a targeted content on its own.

Because targeted contents hide content, they should always have a clear label/title that helps users understand what is in the section. You can use `h3` within them to break up the content.

## When to use

When content is only relevant to some particular users visiting the page.

## When not to use

They shouldn’t be used to make a page seem shorter, for example: using them to hide large chunks of content.
If you find yourself using targeted content to do this, think about:

- If you’re repeating content on the page and could consolidate it.
- Using headings on the page instead.
- If you need to move some of the content onto another page.

## Examples

### Default variant

<%= render(ExampleComponent.new(:targeted_content, :default)) %>

### Adviser variant

<%= render(ExampleComponent.new(:targeted_content, :adviser)) %>

## JavaScript behaviour

Targeted content requires some additional JavaScript behaviour which can be initialised with:

```js
import { initTargetedContent } from "@citizensadvice/design-system";
initTargetedContent();
```

**Note**: If you are supporting IE 11 or earlier make sure you include an [Element.prototype.closest polyfill](https://www.npmjs.com/package/element-closest).

### Fallback behaviour

If JavaScript either fails or is disabled in the users browser the fallback is to show the content as open. Disable JavaScript for this page to see the fallback behaviour in action.

## Using with Rails

If you are using the `citizens_advice_components` gem you call the component from within a template using:

<%= render(ExampleSourceComponent.new(:targeted_content, :default)) %>

### Component arguments

The component accepts a `content` block for the main contents along with the following arguments:

<%= render ArgumentsTableComponent.new(:targeted_content) %>
