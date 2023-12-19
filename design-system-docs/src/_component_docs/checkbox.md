---
title: Checkbox
---

A single checkbox allows a user to affirm a statement or condition.

<%= render(Shared::ComponentExample.new(:checkbox, :default)) %>

## When to use

Use a single checkbox when you want a user to confirm they have understood or agree to something. For example, showing the have read and understood some terms and conditions.

## When not to use

Do not use a checkbox if the user:

- should be able to select one or more choices from a list of options (use a [checkbox group](/components/checkbox-group) for this)
- should only be able to select one choice from a list of options (use a [radio group](/components/radio-group) for this)

## How it works

### With error message

Error messages are used to highlight where users need to change information. They’re used together with an [error summary](/components/error-summary).

<%= render(Shared::ComponentExample.new(:checkbox, :with_error_message)) %>

### With custom id

By default, the checkbox id is generated based on the `name`. If the name and the id need to use a different naming convention, a custom id can be passed.

<%= render(Shared::ComponentExample.new(:checkbox, :with_custom_id)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:checkbox, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:checkbox) %>
