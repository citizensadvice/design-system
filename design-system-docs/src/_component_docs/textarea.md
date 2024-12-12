---
title: Textarea
---

## Examples

### Default

<%= render(Shared::ComponentExample.new(:textarea, :default)) %>

### Optional

<%= render(Shared::ComponentExample.new(:textarea, :optional)) %>

### Page heading

<%= render(Shared::ComponentExample.new(:textarea, :page_heading)) %>

### With hint

<%= render(Shared::ComponentExample.new(:textarea, :with_hint)) %>

### With error message

<%= render(Shared::ComponentExample.new(:textarea, :with_error_message)) %>

### With value

<%= render(Shared::ComponentExample.new(:textarea, :with_value)) %>

### With custom id

By default the id is based on the `name`. This can be customised by passing an `id` argument.

<%= render(Shared::ComponentExample.new(:textarea, :with_custom_id)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:textarea, :all_options)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:textarea) %>
