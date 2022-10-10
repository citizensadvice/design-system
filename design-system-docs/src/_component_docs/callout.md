---
title: Callout
---

There are 4 main callout styles in our Design System:

## Info callout

This callout style should be used on important, non-mandatory advice for users that don’t have any serious or legal implications. There might be other implications.

<%= render(Shared::ComponentExample.new(:callout, :standard)) %>

## Example callout

This style is when an example needs to be displayed. Also, use it for quotes.

<%= render(Shared::ComponentExample.new(:callout, :example)) %>

## Important callout

The important callout should be used for any important snippet of text that has serious and/or legal implications if the user does not follow the advice.

<%= render(Shared::ComponentExample.new(:callout, :important)) %>

## Adviser callout

Content that is for advisers. This should not be shown to the public and you should only show this when an adviser is logged in.

<%= render(Shared::ComponentExample.new(:callout, :adviser)) %>

## Nested callouts

Callouts can be nested inside of other callouts.

<%= render(Shared::ComponentExample.new(:callout, :nested)) %>

## When to use

Callouts can be used to highlight information within content, for example:

- Important information
- Adviser-only information
- Examples
- Quotes

Before using a callout, make sure you really need it. Fewer callouts have more of an impact on a piece of content. Too many callouts can confuse and distract users from other important content on a page.

## Usage

Callouts should come with a title that explains the subject of the information when possible. This will give the users an idea of what the information is about.

#### In the Content Platform Rails app

Note that there is code in the Content Platform app that ensure headings inside callouts are rendered with the correct heading level in order to comply with WCAG accessibility standards. This code will not demote a heading past an `h4` (ie no `h5` etc). No `h4` headings should be used in Contentful.

<%= render(Shared::ComponentExample.new(:callout, :variable_heading_levels)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem you call the component from within a template using:

```rb
<%%= render(CitizensAdviceComponents::Callout.new(type: :example)) do %>
  <h3> Callout title </h3>
  <p> Some example text</p>
<%% end %>
```

### Component arguments

The component accepts a [`content` block](https://viewcomponent.org/guide/#implementation) for the main contents along with the following arguments:

<%= render Shared::ArgumentsTable.new(:callout) %>
