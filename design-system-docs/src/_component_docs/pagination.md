---
title: Pagination
---

<%= render(Shared::ComponentExample.new(:pagination, :default)) %>

## Accessibility requirements

- Pagination is wrapped in a `<nav>` with `role="navigation"` and an appropriate `aria-label` e.g. `aria-label="Pagination navigation"`. You may wish to customise this based on the context it is used in, e.g. "Search pagination"
- Each link has an appropriate `aria-label` e.g. "Go to first page", or "Go to page 3".
- The current page has an `aria-label` of `aria-label="Current page, page 5"` with `aria-current="page"`

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:pagination, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:pagination) %>
