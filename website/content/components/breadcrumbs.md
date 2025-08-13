---
title: Breadcrumbs
---

# Breadcrumbs

Breadcrumbs show users the current location on the website and enable them to quickly move up to a parent level.

## When to use

Use breadcrumbs when a page is located in a hierarchy of at least two levels.

## When not to use

Do not use breadcrumbs on a website with a flat hierarchy or to show the journey through a transaction. If a page is taking users through a multistep process, use the "[Step-by-step Sidebar Navigation](https://www.figma.com/file/J9qfbS9n1pUM2dpRQnTXUD/Design-system-2.0?node-id=813%3A132)" (or consider if a progress indicator is needed instead).

## How it works

Breadcrumbs should be placed on the top left of each page and below the global navigation. They should start with a link to the home page and end with the current page title. Page titles of parent pages should be linked; the current should not have a link. Note that you will have to add the 'Home' link into the links you pass in.

On the small breakpoint, breadcrumbs show the previous parent level as a link by default. You can explicity set this behaviour by passing in
`collaspe` as the type.

Note: the breadcrumbs component on the small breakpoint is currently experimental because more research is needed to validate it.

## Accessibility

### Keyboard

Users should be able to tab between all links using their keyboard.

### Screen reader

Make sure your breadcrumb items reflect the page titles exactly for screen readers.

## Site level breadcrumbs

When breadcrumbs are displayed across the top of site content they are wrapped in a `.cads-breadcrumb-wrapper`.

<%= render(ExampleComponent.new(:breadcrumbs, :default)) %>

## Variations

### No collapse

Prevents the default collapse behaviour on the small breakpoint (for example in search results).

<%= render(ExampleComponent.new(:breadcrumbs, :no_collapse)) %>

### Long page titles in breadcrumbs

This example shows how longer breadcrumb titles are displayed.

<%= render(ExampleComponent.new(:breadcrumbs, :long)) %>

### Not full width

Used when the breadcrumb should not be full width, as in a search result. This will prevent the default wrapping behaviour mentioned above.

<%= render(ExampleComponent.new(:breadcrumbs, :not_full_width)) %>

### Not indicating the current page

If you do not want the last crumb to indicate the current page (for screen readers etc), you can pass in `current_page: false`.

<%= render(ExampleComponent.new(:breadcrumbs, :not_on_current_page)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem there is a view component interface provided. For the default use-case of rendering a global breadcrumb trail we provide some helpers so that breadcrumbs can be rendered with this one-liner:

```erb
<%% render CitizensAdviceComponents::Breadcrumbs.new(cads_breadcrumbs) %%>
```

See the [Using with Rails](/guides/using-with-rails) for more information about how the helper works. If you using the component for anything custom you can populate the links manually:

<%= render(ExampleSourceComponent.new(:breadcrumbs, :default)) %>

The component accepts an array of links with a `url` and `title` properties, in addition to the following optional component arguments:

<%= render ArgumentsTableComponent.new(:breadcrumbs) %>
