---
title: Error summary
---

Error summaries show the user all the errors they’ve made in a form or a tool at the top of the page. They’re used together with error messages.

Error summary and messages are used to highlight where users need to change information, for example if they’ve:

- entered the wrong username and/or password and can’t log in to AdviserNet
- haven’t filled in all the required fields in a tool or form
- haven’t entered a required character, like ‘@’ in an email address
- They’re important because they help users quickly work out what they need to change to finish their task. They also help you get the right information from them.

The error summary contains a title and a list of errors. The list contains anchor page links that will take users to the answer or field they relate to. Always show an error summary when there is a validation error, even if there’s only one.

## Example

<%= render(ExampleComponent.new(:error_summary, :default)) %>

## How to write error messages

We have a straightforward, reassuring and positive tone of voice. This also applies to error text. Keeping error messages clear and concise will help users get to actionable next steps.

You should:

- use plain English and avoid using jargon like 'fields', ‘network exception’ or ‘error 0x608005e4c540’
- give the user guidance for their specific situation, eg ‘enter your email address in the correct format – name@organisation.com’
- keep your error messages short and meaningful, for example avoiding extra words that don’t add value like ‘please’
- never use negative words like ‘failed’, ‘problem’ and ‘invalid’ in the field specific error message
- never patronise the user with ‘funny’ error messages, for example including the word ‘oops’
- avoid language that makes it sound like you’re blaming the user for making a mistake, for example ‘you didn’t enter a name’

## Implementation

Use this component at the top of the page above the H1 so screen readers will read the errors first before reading the whole page.

You must:

- move keyboard focus to the error summary
- link to each of the answers that have validation errors
- make sure the error messages in the error summary are worded the same as those which appear next to the inputs with errors

In rare cases, such as the page feedback, the error summary may not be at the top of the page. Ensure that correct focus is brought to the element so it’s accessible.
If users correct some of the errors on the page but not all, update the error summary with the errors left to correct.

## JavaScript behaviour

Error summary requires some additional JavaScript behaviour which can be initialised with:

```js
import initErrorSummary from "@citizensadvice/design-system/lib/error-summary";
initErrorSummary();
```

**Note**: If you are supporting IE 11 or earlier make sure you include an [Element.prototype.closest polyfill](https://www.npmjs.com/package/element-closest).

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

```erb
<%%= form_with model: @model do |form| %>
  <%%= form.cads_error_summary %>
<%% end %>
```

This uses the Rails validations API behind the scenes and will display the first `full_message` for any errors present on the model. Nothing will be shown if no errors are present. The method optionally accepts a `heading_level` parameter to override the heading level of the title.

### View component version

We also provide an older view component version of the component. Due to the complexities of generating error IDs yourself it's highly recommended you use the form builder methods if you need full validations.

<%= render(ExampleSourceComponent.new(:error_summary, :view_component)) %>

The view component interface accepts an optional `heading_level` argument to override the heading level of the title. The `with_errors` slot accepts an array of objects each with a required `href` and `message`.
