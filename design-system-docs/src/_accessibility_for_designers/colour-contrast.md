---
title: Colour contrast
---

## A brief introduction to colour contrast

Colour contrast is a fundamental and critical aspect of design that plays an important role in ensuring the accessibility, readability, and overall usability of our digital products.

The contrast is in reference to the distinction between foreground (text or graphics) and background colours, which directly impacts how easily users can understand and interact with content.

![Text examples illustrating good and bad contrast. On the top, a good example with black text on a white background. On the bottom a bad example, light yellow text on a white background.](/images/accessibility_for_designers/contrast-examples.png)

## Why is colour contrast important?

The importance of colour contrast stems from two main factors: readability and inclusivity.

### Readability

Adequate colour contrast is vital for users so that text and other visual elements (like icons) are legible and easy to understand. Poor contrast can make it difficult for users to read and understand content, especially those with visual impairments.. High contrast ratios between text and background colours allow users to quickly scan and comprehend information without unnecessary effort.

### Inclusivity

Ensuring our digital products are usable for everyone we should aim to make digital experiences available to everyone, regardless of their abilities. A significant portion of the population, including individuals with no colour vision or other visual impairments, rely on good colour contrast to navigate digital interfaces effectively.

### Examples of good and bad colour contrast

![Text examples illustrating good and bad colour contrast. On the left there are three examples with poor contrast. On the right there are three examples of good contrast.](/images/accessibility_for_designers/contrast-examples.png)

### Key points for designers to consider

#### Ratios

WCAG 2.0 level AA requires a contrast ratio of:

- 4.5:1 for normal text
- 3:1 for large text

WCAG 2.1 requires a contrast ratio of:

- 3:1 for graphics and user interface components (such as form input borders).

WCAG Level AAA requires a contrast ratio of:

- 7:1 for normal text
- 4.5:1 for large text. Large text is defined as 14 point (typically 18.66px) and bold or larger, or 18 point (typically 24px) or larger.

#### Incidental

Text or images of text that are part of an inactive [user interface component](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum#dfn-user-interface-component), that are [pure decoration](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum#dfn-pure-decoration), that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.

#### Logotypes

Text that is part of a logo or brand name has no contrast requirement.

#### At Citizens Advice we use the following examples

- Foreground: Brand primary (#004b88)
- Background: White (#ffffff)

<img src="/images/accessibility_for_designers/text-colour-contrast.png" style="width: 50%" alt="A text example in a brand colour with hex code #004b88 on a white background with hex code #ffffff"/>

- Foreground: Black (#000000)
- Background: Brand secondary (#ffc354)

<img src="/images/accessibility_for_designers/focus-colour-contrast.png" style="width: 50%" alt="A text example with hex code #000000 on a brand yellow background with hex code #ffc354"/>

- Foreground: Hover background colour (#004b88)
- Background: Link colour (#F2F8FF)

<img src="/images/accessibility_for_designers/link-colour-contrast.png" style="width: 50%" alt="A text example with hex code #004b88 on a brand yellow background with hex code #F2F8FF"/>

### Check contrast in different screen modes

You should ensure that the colour contrast is effective in different modes and for those with visual impairments:

#### High contrast mode example

![A web page displayed in high contrast mode, featuring a bold black background and bright yellow and white color contrasts.](/images/accessibility_for_designers/high-contrast-mode.png)

#### Colour enhanced example

![A web page displayed in colour enhanced mode, featuring a white background and enhanced colour copy contrasts.](/images/accessibility_for_designers/colour-enhanced-mode.png)

### Focus indication

[WCAG 2.4.7](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html), requires that user interface elements have visible focus indications. 

High contrast focus indicators make it easier for individuals who rely on keyboard navigation or screen readers to identify where their focus is on the screen. Without clear focus indication, users might inadvertently interact with the wrong elements, leading to errors and frustration.

We use the Focus colour (#FFD250) to highlight focus areas. 

![Four user interface components each highlighted with a glowing yellow outline to indicate that they are in focus.](/images/accessibility_for_designers/focus-states.png)

### How to check contrast

Figma plugin: [Contrast](https://www.figma.com/community/plugin/748533339900865323/contrast)
Just select any layer and the Contrast plugin will let you know which WCAG guidelines it meets (AA or AAA)

Desktop: [colourcontrast.cc](colourcontrast.cc)
An online checker where you add the background and foreground colour. You can also test different fonts.

### Relevant WCAG information
- [1.4.3: Contrast (minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum)
- [1.4.6: Contrast (enhanced)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced)
- [1.4.11: Contrast (non-text)](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast)
