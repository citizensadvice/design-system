---
title: Grid
---

## Basic grids

Grids are made up of three parts:

- A `.cads-grid-container` wrapper element
- One or more `.cads-grid-row` elements to demarcate grid rows
- A combination of `.cads-grid-col-*` classes to demarcate grid columns

<%= render(Shared::ComponentExample.new(:foundations, :grid_basic)) %>

## Multi-column grids

Grids are 12 columns by default (although this can be configured by overriding the `$cads-grid-columns` variable). You can combine a number of column sizes within a grid row.

<%= render(Shared::ComponentExample.new(:foundations, :grid_multi_column)) %>

## Responsive grids

If you want variable grid columns at different breakpoints you can use `sm`, `md`, and `lg` variants of the `.cads-grid-col` classes to control this.

The following example has a column which is 10 columns at large breakpoints, 8 at medium breakpoints, and full-width at small breakpoints.

<%= render(Shared::ComponentExample.new(:foundations, :grid_responsive)) %>
