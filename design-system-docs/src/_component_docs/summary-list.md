---
title: Summary list
---

Use the Summary list component to summarise information for a user.

<%= render(Shared::ComponentExample.new(:summary_list, :default)) %>

## When to use

Use the Summary list to show related information as a list of key facts.

You can use it to summarise a user's response at the end of a form or summarise key information at the top of a page.

## When not to use

The summary list is built using a description list (<dl>) HTML element, so it should only be used to show information that has a key and at least one value.

Do not use the component for tabular data or a simple list, instead use the table component or a <ul> or <ol>.

## How it works

The Summary list is made up of items with a ‘key’ and a ‘value’ which are related to each other. An example of this could be ‘Name’ and ‘John Doe’.

Both the key and value occupy space differently at different breakpoints.

- At 1024 px and above the key occupies one third and the value two thirds.
- At below 1024px the key occupies half of the content and the value half.
- At below 768px the key stacks on top of the value.

## Accessibility

Description lists <dl> are widely supported, but each screen reader exposes the content differently.

### Missing values

If there is an optional field which means that a summary list has a blank value, then use a dash to show something is missing. You will need to consider what a user using a screen reader should hear when reading out that empty state and include that as screen reader only text.

An example would be when someone is checking their answers to a form using the summary list, it might work for your digital service to mark something up for screen reader users as: Optional question - not completed.

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:summary_list, :default)) %>

### Component arguments

<%= render Shared::ArgumentsTable.new(:summary_list) %>
