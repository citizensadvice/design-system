---
title: Names
parent_breadcrumb:
  title: Patterns
  url: /patterns/
---

<%= render CitizensAdviceComponents::OnThisPage.new do |c| %>
<% c.with_links([
{ label: "When to use this", id: "when-to-use" },
{ label: "How it works", id: "how-it-works" },
]) %>
<% end %>

<%= render(ExampleComponent.new(:text_input, :full_name)) %>

Names are important to users. We should ask for users’ names in a way that’s inclusive and helps them feel respected. This helps us build inclusive digital services.

## When to use

You should follow this pattern if you need to ask for people’s names. Only ask for a user’s name if you need it to provide your service.

## How it works

Make it as easy as possible for users to enter their name.

### Single or multiple name fields

You should use a full name field because not everyone’s name fits a first-name and last-name format.

Using multiple name fields means some users might not be able to enter their full name. There’s a risk a user might enter their name entered incorrectly.

### If you need to extract parts of a user’s name

If you need to extract parts of someone's name, you could use a full name field and a preferred name field. You should test this with your users.

If you need to extract someone's official name you could use a first and last name field.

<%= render(ExampleComponent.new(:text_input, :preferred_name)) %>

### Middle names

Only ask for middle names if your service needs them.

### Avoid asking for a title

Avoid asking users for their title because:

- it’s extra work for them
- it asks for personal information gender or marital status which they might not want to give

### Name input

If your service allows it your full name field should:

- allow all special characters, including numbers and symbols
- let people use spaces or names in a different order
- be long enough for names that don't follow a first and last name structure
- not change what the user has entered - for example, by automatically capitalising letters

### Use autocomplete attribute on name fields

When asking for a user’s name, use the `autocomplete` attribute on the field component. This lets the browser autofill the information if the user has entered it previously.

You’ll need to do this to meet [WCAG 2.2 success criterion ‘1.3.5 Identify input purpose’](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html).

### Do not spellcheck users’ names

Browsers sometimes try to correct spelling in form fields. This can make unhelpful assumptions about people’s names.

To prevent this, set the `spellcheck` attribute to `false`.

<%= render(ExampleComponent.new(:text_input, :full_name)) %>

### Error messages

You should style error messages like this example. Make sure your error messages are clear and helpful. You should think about the different reasons an error might happen and write specific messages for each one.

<%= render(ExampleComponent.new(:text_input, :full_name_error)) %>

### Research on this pattern

If you research on this pattern, you might be able to help improve it. Get in touch on the design system community Slack channel.

<div class="text-list">
  <ul class="text-list__links">
    <li><a href="https://www.w3.org/International/questions/qa-personal-names">Read about how people's names differ around the world on the W3C website.</a></li>
    <li><a href="https://docs.google.com/presentation/d/1Uc-0OqRu8blPTD9jm9cL4PkbaAbYSuf3WUDRrqFgknk/edit?slide=id.ga4b3d89dcc_1_0#slide=id.ga4b3d89dcc_1_0">Read the non-advice product team's discovery and user research (Google Slides).</a></li>
  </ul>
</div>
