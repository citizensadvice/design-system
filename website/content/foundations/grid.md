---
title: Grid
---

Grid styles are made up of 3 parts:

- A `.cads-grid-container` wrapper element
- One or more `.cads-grid-row` elements to demarcate grid rows
- A combination of `.cads-grid-col-*` classes to demarcate grid columns

The included grid system is intended to be used for basic multi-column layouts and grid containers can't be nested. If you need a more custom layout you'll need to write custom styles.

<%= render(ExampleComponent.new(:foundations, :grid_basic)) %>

In most cases you'll want to use a responsive grid and you can use either `sm`, `md`, and `lg` variants of the `.cads-grid-col` classes to control this.

The following example has a column which is 8 columns at large breakpoints and full-width at smaller breakpoints.

<%= render(ExampleComponent.new(:foundations, :grid_responsive)) %>

The most common use case for grid classes is for defining a basic page content layout.

```erb
<div class="cads-page-content">
  <div class="cads-grid-container">
    <div class="cads-grid-row">
      <main class="cads-grid-col-md-8">
        <h1 class="cads-page-title">Hello Design System!</h1>
      </main>
      <div class="cads-grid-col-md-4">
        Some sidebar content
      </div>
    </div>
  </div>
</div>
```

This is a common enough pattern that we provide a `PageContent` component which can be used when you need a standard main column with optional sidebar. You can replace the above HTML with this:

```erb
<%%= render CitizensAdviceComponents::PageContent.new do |c| %>
  <%% c.with_main do %>
    <h1 class="cads-page-title">Hello Design System!</h1>
  <%% end %>
  <%% c.with_sidebar do %>
    Some sidebar content
  <%% end %>
<%% end %>
```
