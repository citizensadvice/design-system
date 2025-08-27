---
title: Button
---

Use the button component to help users carry out an action like submitting a form. You should avoid using buttons for simple links. Use regular text links instead.

Write button text in sentence case, describing the action it performs. E.g. “Save and continue” rather than “Submit”.

## How it works

Primary buttons should be used for the main action, such as submitting a form. Align the primary action button to the left edge of your form.

<%= render(ExampleComponent.new(:button, :primary)) %>

Secondary button should be used for secondary calls to action. Typically there should be only one primary button and one secondary button within a form. Before adding more than one secondary button, reconsider how you are structuring your design and try to break it down or make it simpler.

<%= render(ExampleComponent.new(:button, :secondary)) %>

Tertiary buttons are used for turning something on or off instantly on a page – for example, references and “Expand all” actions.

<%= render(ExampleComponent.new(:button, :tertiary)) %>

Link buttons are styled to look like hyperlinks. Use these when you want a button to draw less attention, or when you would prefer to have a text styling but the action changes state such as deleting an item or logging out a user.

<%= render(ExampleComponent.new(:button, :linkbutton)) %>

## Using buttons with icons

Icons can be placed next to the button label to clarify an action or call attention. Buttons can be used with either a left or right aligned icon.
The spacing between an icon and the button text should be 4px. Use the small icon (16px) within a button.
The icon must be the same color value as the text.

<p><img src="<%= image_path "components/button-with-icon-example.png" %>" style="width: 300px" /></p>

## Previous / next

We use “Next” and “Previous” buttons in a multi-step form to help users navigate between pages.

They are:

- aligned to the left so users do not miss it
- the primary button “Next” should come first
- the secondary button “Previous” is aligned below so the arrows don’t point to each other, which would be confusing

<%= render(ExampleComponent.new(:button, :previous_next)) %>

In different contexts, you can use primary and secondary buttons side by side. Your team should design this based on the user needs and context of the service.

## Accessibility

Buttons have a clear `:focus` style when tabbing or focussing on the button
When selecting a button, it will depress slightly to give users visual feedback that an action has taken place.

Use `<input type=submit>` or `<button>` elements depending on if the button submits a form, or performs an interaction.
Do not use anchor tags with an empty href when you want a button `<a href=”#”>`. Read more about [why the empty href is a bad thing](https://adrianroselli.com/2016/01/links-buttons-submits-and-divs-oh-hell.html).

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(ExampleSourceComponent.new(:button, :primary)) %>

### Component arguments

<%= render ArgumentsTableComponent.new(:button) %>

### Icon slots

The button component accepts an `icon_left` or `icon_right` slot for buttons with icons.

<%= render(ExampleSourceComponent.new(:button, :previous_next)) %>
