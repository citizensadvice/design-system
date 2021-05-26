Feature: Input forms

  The Input forms provide the user with a way of submitting plain text.
  They can be provided with varying levels of hints or labels

  Rule: Basic Input
    Background:
      Given I have a Basic Input form on page

    Scenario: Input form is on the page without any hints
      When I type "Hello" into the text box
      Then the text box has a value of "Hello"
      And there is a label
      But there is no hint
      And there is no optional label
      And there is no error message

  Rule: Input with a Hint
    Background:
      Given I have an Input form with a hint

    Scenario: Input can have a hint
      When I type "Hello" into the text box
      Then the text box has a value of "Hello"
      And there is a label
      And there is a hint
      But there is no optional label
      And there is no error message

  Rule: Optional Input
    Background:
      Given I have an Optional Input form on page

    Scenario: English Input can have an optional label
      When I type "Hello" into the text box
      Then the text box has a value of "Hello"
      And there is a label
      And there is a hint
      And there is an optional label
      But there is no error message

    Scenario: Welsh Input can have an optional label
      Given the language is Welsh
      When I type "Hello" into the text box
      Then the text box has a value of "Hello"
      And there is a label
      And there is a hint
      And there is an optional label
      But there is no error message

  Rule: Errored Input
    Background:
      Given I have an Errored Input form on page

    Scenario: English Input can show an error message
      When I type "Hello" into the text box
      Then the text box has a value of "Hello"
      And there is a label
      And there is a hint
      And there is an optional label
      And there is an error message

    Scenario: Welsh Input can show an error message
      Given the language is Welsh
      When I type "Hello" into the text box
      Then the text box has a value of "Hello"
      And there is a label
      And there is a hint
      And there is an optional label
      And there is an error message
