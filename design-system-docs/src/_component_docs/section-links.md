---
title: Section links
---

## Examples

### Default

<%= render(Shared::ComponentExample.new(:section_links, :default)) %>

### With custom content

<%= render(Shared::ComponentExample.new(:section_links, :with_custom_content)) %>

### With additional attributes

Any additional key/value pairs (beyond `title` and `url`) in your section link definition will be added to the link (eg `"aria-current":"page"`).

<%= render(Shared::ComponentExample.new(:section_links, :with_additional_attributes)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:section_links, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:section_links) %>

### Links slot

The section links component accepts a required `links` slot. Links are an array of the following options:

<%= render Shared::ArgumentsTable.new(:section_links_links_slot) %>

### Custom content

The component accepts a `custom_content` slot for additional content such as adviser only links. Please note that content will be rendered into a nav element which accepts flow content elements.
