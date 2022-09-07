---
title: Checkbox
---

A single checkbox allows a user to affirm a statement or condition.

<%= render(Shared::ComponentExample.new(:checkbox, :default)) %>

## When to use

Use a single checkbox when you want a user to confirm they have understood or agree to something. For example, showing the have read and understood some terms and conditions.

## When not to use

Do not use a checkbox if the user:

- should be able to select one or more choices from a list of options (use a [checkbox group](/docs/forms-checkbox-group--basic) for this)
- should only be able to select one choice from a list of options (use a [radio group](/docs/forms-radio-group--basic#radio-groups) for this)

## How it works

### With error message

Error messages are used to highlight where users need to change information. They’re used together with an [error summary](/design-system/styleguide/forms/components-error-summary--page?path=/docs/forms-error-summary--example).

<%= render(Shared::ComponentExample.new(:checkbox, :with_error_message)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:checkbox, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:checkbox) %>
