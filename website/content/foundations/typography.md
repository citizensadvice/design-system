---
title: Typography
---

Our typeface is Open Sans, it's modern, easy to read and available to download for free. We use font weight bold (700) and normal (400) on our websites.

By default the design system applies minimal global styling. In order to opt-in to prose styling you'll need to wrap your text in a `.cads-prose` container.

```html
<h1 class="cads-page-title">Your options if you're in the UK illegally</h1>
<div class="class="cads-prose">
  <h2>Get immigration advice</h2>
  <h3>If you're a British citizen</h3>
  <p>
    Your family members who are citizens of countries outside the EU, EEA or
    Switzerland might be able to apply to the EU Settlement Scheme if one of the
    following applies
  </p>
</div>
```

This recommended as the preferred way to apply typographic styling but is particularly useful if you have content coming from a CMS or rich text editor.

If you need to apply these styles to heading elements that you cannot add a class to but want more tightly scoped styles than the default `.cads-prose` class you can add a `.cads-prose-direct-descendants` class instead which will target direct descendants only using the `>` child combinator selector.

This is useful when you are embedding lots of rich components within a prose block and you want to more narrowly scope the effects of the cascade.

```html
<main class="cads-prose-direct-descendants">
  <h1>Your options if you're in the UK illegally</h1>
  <h2>Get immigration advice</h2>
  <h3>If you're a British citizen</h3>
  <p>
    Your family members who are citizens of countries outside the EU, EEA or
    Switzerland might be able to apply to the EU Settlement Scheme if one of the
    following applies
  </p>

  <div class="my-special-component">
    <p>Prose styles are not applied here</p>
  </div>
</main>
```

## Body text

<%= render(ExampleComponent.new(:foundations, :typography_paragraph)) %>

Use small text for metadata and some UI components. The majority of your body copy should use the standard 18px font size.

<%= render(ExampleComponent.new(:foundations, :typography_small_paragraph)) %>

### Available utilities for body text

If you need to achieve these styles outside of a `.cads-prose` container, you can either add the relevant CSS class:

```html
<p class="cads-paragraph">A regular paragraph</p>
<p class="cads-paragraph-small">A small paragraph</p>
```

Or use the styles directly by extending a placeholder selector in your SCSS:

```scss
.my-paragraph {
  @extend %cads-paragraph;
}

.my-small-paragraph {
  @extend %cads-paragraph-small;
}
```

## Headings

We provide styles for headings level 1-4, if you are using headings beyond this you'll need to provide your own styles. Make sure to use the appropriate heading level, and avoid skipping heading levels.

<%= render(ExampleComponent.new(:foundations, :typography_headings)) %>

When building new components, avoid using line height for spacing and alignment. Use the typographic scale that is established.

### Available utilities for headings

If you need to achieve these styles outside of a `.cads-prose` container, you can either add the relevant CSS class:

```html
<h1 class="cads-h1">A level 1 heading</h1>
<h2 class="cads-h2">A level 2 heading</h2>
<h3 class="cads-h3">A level 3 heading</h3>
<h4 class="cads-h4">A level 4 heading</h4>
<h3 class="cads-h4">A h3 that visually looks like a h4</h3>
```

Or use the styles directly by extending a placeholder selector in your SCSS:

```scss
.my-h1 {
  @extend %cads-h1;
}

.my-h2 {
  @extend %cads-h2;
}

.my-h3 {
  @extend %cads-h3;
}

.my-title-that-looks-like-an-h4 {
  @extend %cads-h4;
}
```

This can be particularly useful when you need to use a semantic heading level that doesn't match its visual presentation i.e. a `h3` which needs to look like a `h4`.

### Adjacent heading mixin

To ensure that headings have the correct margins applied inside the `.cads-prose` element, a mixin has been used that will add the correct margin. This is automatically applied to the relevant elements that appear in a `.cads-prose` wrapper.

```scss
@include cads-adjacent-heading-margin($margin);
```

If you are creating components that will live inside a `.cads-prose` element and that will enclose an `h2` or `h3` heading, you will need to add the mixin to the class that is enclosing the heading.

For example, you have created a `.my-new-component` div that wraps a header and a button, which is itself inside the `.cads-prose` element:

```html
<main class="cads-prose">
  <h2>Some heading</h2>
  <p>Some content</p>
  <div class="my-new-component">
    <h2>My reference heading</h2>
    <button>Add reference</button>
  </div>
</main>
```

To ensure the appropriate margin between the `<p>` and the `<div>` in the above example, use the mixin in your new component:

```scss
.my-new-component {
    @include cads-adjacent-heading-margin($cads-spacing-7);
    ...
}
```

### How to mark up the page title

The `h1` of the page should usually be the page title, we provide a dedicated class for this which should be used when marking up a page title specifically:

<%= render(ExampleComponent.new(:foundations, :typography_page_title)) %>

## Links

Links are blue and underlined by default. Avoid opening links in a new tab, as it can confuse some users.

<%= render(ExampleComponent.new(:foundations, :typography_link)) %>

Read our guidance about using <a href ="?path=/docs/components-buttons--primary">buttons as links</a>.

## Lists

### Unordered lists

Unordered lists should be used to show collections of items where their order does not have meaning, for example the criteria for claiming a particular benefit.

<%= render(ExampleComponent.new(:foundations, :typography_unordered_list)) %>

You can extend the following placeholder to achieve the correct unordered list styling outside of a `.cads-prose` element.

```scss
.my-unordered-list {
  @extend %cads-list-unordered;
}
```

In some situations, you will want the styles of an unordered list without the bullet points - for example to present a list of links on a summary page.

<%= render(ExampleComponent.new(:foundations, :typography_plain_list)) %>

You can extend the following placeholder to achieve the correct plain list styling outside of a `.cads-prose` element.

```scss
.my-plain-list {
  @extend %cads-list-no-bullet;
  ...
}
```

### Ordered lists

Ordered lists should be used to show collections of items where the order does have meaning, for example the steps in a process.

<%= render(ExampleComponent.new(:foundations, :typography_ordered_list)) %>

You can use the following placeholders to achieve the correct ordered list styling outside of a `.cads-prose` element.

```scss
.my-ordered-list {
  @extend %cads-list-ordered;
  ...
}
```
