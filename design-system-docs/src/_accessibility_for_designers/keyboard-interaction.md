---
title: Keyboard interaction
---

## A brief introduction to keyboard navigation

Products must be operable by keyboard as a range of users use keyboard without a mouse to access content and tools. To be accessible a web page must have visible keyboard focus and a defined tab order and avoid keyboard traps. Some users use a standard keyboard and some use a specialised keyboard to navigate content.

## Why is it important

It’s important for users so they have the same opportunity to interact with all content on a web page and allow users to understand how they can interact with content in a consistent way. Incorrect tabbing order can make users feel confused if pages don’t follow a logical tabbing order and they might not be able to seek the information they need.

## Logical navigation order

Navigation order is the order in which interactive elements like navigation receive focus on a webpage. It’s important that the order feels logical and clear. Tab order should follow the structure of the source code. Tab index should always follow the correct order but there might be instances where focus starts on the most important element on the page. It’s worth considering how your web page breaks down on small devices and how the tab order remains consistent if the visual aspect of it changes from large devices to small breakpoints e.g if a side nav is used and moves into a different position on a small device.

## Documenting the change of keyboard interaction

It’s important to document your tabbing order across pages and forms and share with a developer if there is a user need of why an important element needs to be higher in the tab index order.

## How to check keyboard interaction

Testing keyboard interaction is important, you can use [web aims guide](https://webaim.org/techniques/keyboard/) showcasing interaction types and what keystrokes to use.

### Relevant WCAG information

[2.1 Keyboard Accessible](https://www.w3.org/WAI/WCAG21/Understanding/keyboard-accessible.html)

[2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)

[2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap)

[2.4.3 Focus Order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)

[2.4.7 Focus visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)
