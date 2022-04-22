---
title: Using icons
order: 1
---

If you are implementing SVG icons in your code, please refer to [Components - SVG Icons](?path=/docs/components-svg-icons--default).

Icons should be informative and recognisable. They should only be used in a purposeful manner to maximise comprehension when you need to call attention to a particular action.
Icons should be used in combination with a meaningful label or supporting text whenever possible. Avoid `aria-labels` if you are rendering the icon with visible text to prevent accessibility label duplication.

## Colour

Icons should always be in a single, solid colour and need to meet the same colour contrast ratio as Typography (4.5:1). The colour of the icon should reflect the importance of the icon’s action which should always be to help guide a user. For more information on colour, see the [Colour guidelines](/design-system/?path=/story/foundations-colours--page).

## Sizing

There are 2 icon sizes in our Design System:

### 16px (small)

We use small icons in our components such as "Chevron" in the buttons or a "Plus" in the targeted content. We also use an "External link" in the content whenever it’s needed.

### 24px (medium)

Medium icons are generally used as a button such as the "Search" button and the "Print this page" button in the toolbar on the Public site and AdviserNet.
Do not attempt to re-size the icon, as they are designed specifically for a certain size. Only use these 2 icon sizes to ensure the consistency throughout our designs.

<%= render(Shared::IconGrid.new) %>

## Alignment

When an icon is right next to the text, they should be centre-aligned and have 4px spacing in-between.

<img src="/images/foundations/icon-alignment-example.png" style="width: 350px" />

## Contribute

### Considerations before creating a new icon

Before trying to create a new icon:

- propose the new icons to the design community and discuss details and requirements in the regular design system meeting or design community meeting
- consider if the new icon serves an user need – if you’re not sure, you probably don’t need it
- check if the new icon will be used multiple times throughout different products or services
- make sure the new icon has a clear meaning

Propose the new icons to the design community and discuss details and requirements in the regular design system meeting or design community meeting. This will help us to have a transparent process for creating new assets, maintaining a minimal and high quality icon set in our Design System.

### Clarity (pixel-perfect)

In order to have the best clarity especially for lower resolution screens, make sure the icon is always pixel-perfect.

<img src="/images/foundations/icon-pixel-good-example.png" style="width: 350px" />

👍 Do: an icon is on pixel and pixel-perfect.

<img src="/images/foundations/icon-pixel-bad-example.png" style="width: 350px" />

👎 Don't: an icon is off pixel.

### Making an icon

Use the guideline artboards in the [Design System 2.0 Figma file](https://www.figma.com/file/J9qfbS9n1pUM2dpRQnTXUD/?node-id=716%3A0) and follow the rules below. Speak to the design community if you have any questions about the rules.

- Use the 16px x 16px or 24px x 24px artboard for each icon.
- The 16px icon should have 1px padding and the 24px icon should have 2px padding.
- Set your workspace up from the start to snap to pixels without decimals.
- Icons should be at whole pixels. No decimals are allowed in x and y coordinates or width and height fields.
- Each artboard and the artwork within it must be aligned to the pixel grid.
- The icon should be on the top of the boundary box layer in the artboard.
- All possible shapes and paths should be combined. This will allow us to have a good SVG setup when extracting icons.

<img src="/images/foundations/icon-svg-good-example.png" style="width: 200px" />

```html
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="24" height="24" fill="white" />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M17.2835 6H19.2258C19.6702 6 20.0159 6.34737 19.9994 6.7579V7.24602C19.9994 7.67233 19.6538 8.00391 19.2258 8.00391H18.0008L18.0008 20.2579C18.0008 20.6684 17.6551 21 17.2272 21H6.78733C6.35936 21 6.01369 20.6684 6.01369 20.2579L6.01369 8.00391H4.77364C4.34567 8.00391 4 7.67233 4 7.24602V6.7579C4 6.34737 4.34567 6 4.77364 6H6.48551L8.02476 6L8.02476 3.75789C8.02476 3.33158 8.37043 3 8.81486 3L15.2177 3C15.6621 3 16.0078 3.33158 16.0078 3.7579L16.0078 6H17.2835ZM13.9961 5L10 5L10 6L13.9961 6L13.9961 5ZM8.00779 19.0039H16.0078L16.0078 8.00391H8.00779L8.00779 19.0039ZM9.71141 18.0029H10.2888C10.6838 18.0029 10.9966 17.7345 10.9966 17.3081V9.70625C10.9966 9.26414 10.6838 9.01151 10.2888 9.01151H9.71141C9.31636 9.01151 9.00362 9.27993 9.00362 9.70625V17.3081C9.00362 17.7503 9.31636 18.0029 9.71141 18.0029ZM13.7148 18.0029H14.2922C14.6873 18.0029 15 17.7345 15 17.3081V9.70625C15 9.26414 14.6873 9.01151 14.2922 9.01151H13.7148C13.3198 9.01151 13.007 9.27993 13.007 9.70625V17.3081C13.007 17.7503 13.3198 18.0029 13.7148 18.0029Z"
    fill="#004B88"
  />
</svg>
```

👍 Do: all icon paths are combined.

<img src="/images/foundations/icon-svg-bad-example.png" style="width: 200px" />

```html
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="24" height="24" fill="white" />
  <path
    d="M13.7148 18.0029H14.2922C14.6873 18.0029 15 17.7345 15 17.3081V9.70625C15 9.26414 14.6873 9.01151 14.2922 9.01151H13.7148C13.3198 9.01151 13.007 9.27993 13.007 9.70625V17.3081C13.007 17.7503 13.3198 18.0029 13.7148 18.0029Z"
    fill="#004B88"
  />
  <path
    d="M9.71141 18.0029H10.2888C10.6838 18.0029 10.9966 17.7345 10.9966 17.3081V9.70625C10.9966 9.26414 10.6838 9.01151 10.2888 9.01151H9.71141C9.31636 9.01151 9.00362 9.27993 9.00362 9.70625V17.3081C9.00362 17.7503 9.31636 18.0029 9.71141 18.0029Z"
    fill="#004B88"
  />
  <path
    d="M19.2258 6H17.2835H16.0078L16.0078 3.7579C16.0078 3.33158 15.6621 3 15.2177 3L8.81486 3C8.37043 3 8.02476 3.33158 8.02476 3.75789L8.02476 6L6.48551 6H4.77364C4.34567 6 4 6.34737 4 6.7579L4 7.24602C4 7.67233 4.34567 8.00391 4.77364 8.00391H6.01369L6.01369 20.2579C6.01369 20.6684 6.35936 21 6.78733 21H17.2272C17.6551 21 18.0008 20.6684 18.0008 20.2579L18.0008 8.00391H19.2258C19.6538 8.00391 19.9994 7.67233 19.9994 7.24602V6.7579C20.0159 6.34737 19.6702 6 19.2258 6ZM10 5L13.9961 5L13.9961 6L10 6L10 5ZM16.0078 19.0039H8.00779L8.00779 8.00391H16.0078L16.0078 19.0039Z"
    fill="#004B88"
  />
</svg>
```

👎 Don't: icon paths are not combined.
