---
title: Breadcrumbs
---

# Breadcrumbs

Breadcrumbs show users the current location on the website and enable them to quickly move up to a parent level.

## When to use

Use breadcrumbs when a page is located in a hierarchy of at least two levels.

## When not to use

Do not use breadcrumbs on a website with a flat hierarchy or to show the journey through a transaction. If a page is taking users through a multistep process, use the "[Step-by-step Sidebar Navigation](https://www.figma.com/file/J9qfbS9n1pUM2dpRQnTXUD/Design-system-2.0?node-id=813%3A132)" (or consider if a progress indicator is needed) instead.

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

When breadcrumbs are displayed across the top of site content they must be wrapped in a `.cads-breadcrumb-wrapper`, this
will correctly style and align the breadcrumbs with site content. See sample pages for details.

NB: If you are using the `ViewComponent` version of the breadcrumbs, they will be wrapped for you by default. You can pass `full_width: false` if you don't want those crumbs wrapped.

<%= render(Shared::ComponentExample.new(:breadcrumbs, :default)) %>

## Variations

### No collapse

To prevent the default collapse behaviour on the small breakpoint, pass `"type" => "no-collapse"`. For example: in search results.

<%= render(Shared::ComponentExample.new(:breadcrumbs, :no_collapse)) %>

### Long page titles in breadcrumbs

This story shows how longer breadcrumb titles are displayed.

<%= render(Shared::ComponentExample.new(:breadcrumbs, :long)) %>

### Not full width

When shown somewhere where they should not be full width, as in a search result, you can pass in `full_width: false`. This will prevent the default wrapping behaviour mentioned above.

<%= render(Shared::ComponentExample.new(:breadcrumbs, :not_full_width)) %>

### Not indicating the current page

If you do not want the last crumb to indicate the current page (for screen readers etc), you can pass in `current_page: false`.

<%= render(Shared::ComponentExample.new(:breadcrumbs, :not_on_current_page)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:breadcrumbs, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:breadcrumbs) %>
