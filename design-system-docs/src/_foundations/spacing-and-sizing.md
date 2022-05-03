---
title: Spacing & Sizing
---

All page content should be limited to 1200px wide. Use the `$cads-max-content-size` variable for setting the `width` or apply the `.cads-max-content-width` class to restrict the content of your components on large screen sizes.

## Spacing

Spacing variables can be used directly in your SASS.

<%= render(
CitizensAdviceComponents::Table.new(
header: [
"Variables",
"Example",
"Size"
],
rows: [
[
"$cads-spacing-1",
"<div class='spacing-block-1' />",
"4px"
],
[
"$cads-spacing-2",
"<div class='spacing-block-2' />",
"8px"
],
[
"$cads-spacing-3",
"<div class='spacing-block-3' />",
"12px"
],
[
"$cads-spacing-4",
"<div class='spacing-block-4' />",
"16px"
],
[
"$cads-spacing-5",
"<div class='spacing-block-5' />",
"24px"
],
[
"$cads-spacing-6",
"<div class='spacing-block-6' />",
"32px"
],
[
"$cads-spacing-7",
"<div class='spacing-block-7' />",
"40px"
],
])
) %>

## Borders widths

<%= render(
CitizensAdviceComponents::Table.new(
header: [
"Variables",
"Example",
"Size"
],
rows: [
[
"$cads-border-width-small",
"<div class='sizing-border' />",
"1px"
],
[
"$cads-border-width-medium",
"<div class='sizing-border sizing-border--medium' />",
"2px"
],
[
"$cads-border-width-large",
"<div class='sizing-border sizing-border--large' />",
"4px"
],
])
) %>
