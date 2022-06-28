---
title: Typography
---

Our typeface is Open Sans, it's modern, easy to read and available to download for free. We use font weight bold (700) and normal (400) on our websites.

## Body

<%= render(Shared::ComponentExample.new(:foundations, :typography_paragraph)) %>

Use small text for metadata and some UI components. The majority of your body copy should use the standard 18px font size.

export const paragraphSmallHtml = `<p class="my-small-paragraph">Small paragraph font size is 16px on large screens and 14px on smaller screens.</p>`;

// small paragraph story

### Technical implementation

Paragraph styles have been created using placeholders and extended into the relevant classes for components that consume them.

If you need to achieve these styles outside of a `.cads-prose` element, you will need to extend these placeholders.

```scss
.my-paragraph {
  @extend %cads-paragraph;
}

.my-small-paragraph {
  @extend %cads-paragraph-small;
}
```

If you need to apply the `%cads-paragraph` styles to `p` elements that you cannot add a class to, for example content from a CMS or rich text editor, wrap them in a `.cads-prose` element:

```html
<main class="cads-prose">
  <p>
    Your family members who are citizens of countries outside the EU, EEA or
    Switzerland might be able to apply to the EU Settlement Scheme if one of the
    following applies
  </p>
</main>
```

## Headings

Make sure to use the appropriate <h#> level, and don't skip heading levels.

H4s are available for custom designed components or pages. Do not use for advice content. If using an H4 in your designs, make sure to use correct heading levels.

export const headingsHtml = `<h1 class="my-h1">Heading level 1</h1><h2 class="my-h2">Heading level 2</h2><h3 class="my-h3">Heading level 3</h3><h4 class="my-h4">Heading level 4</h4></div>`;

// headings story

### Technical implementation

When building new components, avoid using line height for spacing and alignment. Use the typographic scale that is established.

Heading styles have been created using placeholders and extended into the relevant classes for components that consume them.

If you need to achieve these styles outside of a `.cads-prose` element, you will need to extend these placeholders.

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

export const headingsProseHtml =
'<div class="cads-prose"><h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3></div>';

If you need to apply these styles to heading elements that you cannot add a class to, for example content from a CMS or rich text editor, wrap them in a `.cads-prose` element:

```html
<main class="cads-prose">
  <h1>Your options if you're in the UK illegally</h1>
  <h2>Get immigration advice</h2>
  <h3>If you're a British citizen</h3>
  <p>
    Your family members who are citizens of countries outside the EU, EEA or
    Switzerland might be able to apply to the EU Settlement Scheme if one of the
    following applies
  </p>
</main>
```

#### Adjacent Heading Mixin

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

## Links

Links are blue and underlined by default. Avoid opening links in a new tab, as it can confuse some users.

export const linkTextHtml = `<p class="my-paragraph"><a href="">cads-hyperlink</a></p>`;

// links story

Read our guidance about using <a href ="?path=/docs/components-buttons--primary">buttons as links</a>.

### External Links

When you link to a page external to your website add the `.cads-hyperlink--external` class to display an icon after the link.

If your links appear within a `.cads-prose` container this style is automatically applied for all links with a `rel=external` attribute or that don't match the value set for `$cads-internal-link-domain` (defaults to `https:/www.citizensadvice.org.uk`).

export const externalLinkHTML = `
<p class="my-paragraph">
  A <a href="http://www.example.com/unvisted" class="cads-hyperlink--external">cads-hyperlink--external</a> link, displayed in a paragraph.
</p>
<main class="cads-prose">
  <p>This is a link to an <a href="https://www.example.com" rel="external">external site</a>, while this link is within <a href="https://www.citizensadvice.org.uk/immigration">Citizens Advice</a></p>
</main>
`;

// external links story


## Lists

### Unordered lists

#### Standard

Unordered lists should be used to show collections of items where their order does not have meaning, for example the criteria for claiming a particular benefit.

// unordered list story

##### Technical Implementation

You can extend the following placeholder to achieve the correct unordered list styling outside of a `.cads-prose` element.

```scss
.my-unordered-list {
  @extend %cads-list-unordered;
}
```

#### Plain

In some situations, you will want the styles of an unordered list without the bullet points - for example to present a list of links on a summary page.

// plain list story

##### Technical Implementation

You can extend the following placeholder to achieve the correct plain list styling outside of a `.cads-prose` element.

```scss
.my-plain-list {
  @extend %cads-list-no-bullet;
  ...
}
```

### Ordered lists

Ordered lists should be used to show collections of items where the order does have meaning, for example the steps in a process.

// ordered list story

#### Technical Implementation

You can use the following placeholders to achieve the correct ordered list styling outside of a `.cads-prose` element.

```scss
.my-ordered-list {
  @extend %cads-list-ordered;
  ...
}
```

