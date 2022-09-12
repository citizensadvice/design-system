---
title: Colours
---

We use colour language to dictate what our digital colours are and how they should be used. Use the colour language for the purpose that is defined – for example, use ‘input-border-colour’ for form inputs.

The same colour is sometimes repeated because it’s used in different ways – for example, the ‘Important callout’ and ‘Error’ colour are both using the hex value #DF3034. This means we can change the 'Important callout' colour without affecting the 'Error' colour.

## Brand

Brand colours are usually used in global components such as the global navigation to create a consistent look on the website.

<%= render(Shared::ColourTable.new([
['Brand primary', 'brand-primary'],
['Brand secondary', 'brand-secondary']
])) %>

### Text

There are 2 shades of text colour. Choose the colours carefully based on the importance of the information.

<%= render(Shared::ColourTable.new([
['Text', 'text-colour'],
['Secondary text', 'secondary-text-colour']
])) %>

### Links

There are various colours for different interaction states. When different coloured backgrounds are used in designs, **make sure the colour contrast ratio of all the interaction states meets at least 4.5:1** – this is the same for typography.

<%= render(Shared::ColourTable.new([
['Link', 'link-colour'],
['Visited', 'link-visited-colour'],
['Hover', 'link-hover-colour'],
['Hover background', 'hover-background-colour'],
['Active', 'link-active-colour'],
])) %>

### Focus

<%= render(Shared::ColourTable.new([
['Link', 'focus-colour'],
['Focus text', 'focus-text-colour'],
])) %>

### Border

Use the ‘Input border’ for interactive elements like input boxes so it meets the contrast ratio of 3:1. ‘Border’ is usually used for decorative lines and dividers.

<%= render(Shared::ColourTable.new([
['Input border', 'input-border-colour'],
['Border', 'border-colour'],
])) %>

### Buttons

<%= render(Shared::ColourTable.new([
['Button', 'primary-button-colour'],
['Button hover', 'primary-button-hover-colour'],
])) %>

### Adviser

Only use ‘Adviser’ colours for adviser-related components, like ‘Adviser callout’. This is also the brand colour for AdviserNet.

<%= render(Shared::ColourTable.new([
['Adviser', 'brand-adviser']
])) %>

## Accessibility

In order to meet [level AA of WCAG 2.1](https://www.w3.org/TR/WCAG21/), make sure the colour contrast ratio meets:

- 4.5:1 for typography
- 3:1 for interactive elements

Don’t use colour alone to communicate information. This means users who can’t see colours, or who have difficulty telling different colours apart, have some other way to do so.

## Implementation

Use the sass variables instead of the hex codes. This means you’ll always be using the most recent colour palette. Only use the sass variables in the context they’re designed for. Otherwise, use the colour palette.
