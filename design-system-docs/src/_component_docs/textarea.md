---
title: Textarea
---

## Examples

### Default

<%= render(Shared::ComponentExample.new(:textarea, :default)) %>

### Optional

<%= render(Shared::ComponentExample.new(:textarea, :optional)) %>

### With hint

<%= render(Shared::ComponentExample.new(:textarea, :with_hint)) %>

### With error message

<%= render(Shared::ComponentExample.new(:textarea, :with_error_message)) %>

### With value

<%= render(Shared::ComponentExample.new(:textarea, :with_value)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:textarea, :all_options)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:textarea) %>
