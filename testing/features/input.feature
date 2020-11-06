Feature: Input component

  The Input component represents a field for text input, the control associated
  with this field is a text box that allows users to edit a single line of plain
  text, providing means to submit data

  Rule: Basic Input
    Background:
      Given I have a Basic Input component on page

    Scenario: Input form is on the page without any hints
      Then there is a label
      And I can type "Hello" into the text box
      But there is no hint
      And there is no optional label
      And there is no error message

  Rule: Input with a Hint
    Background:
      Given I have an Input component with a hint

    Scenario: Input form is on the page with hints
      Then there is a label
      And there is a hint
      And I can type "Hello" into the text box
      But there is no optional label
      And there is no error message

  Rule: Optional Input
    Background:
      Given I have an Optional Input component on page

    Scenario: Input form is on the page with hints
      Then there is a label
      And there is a hint
      And there is an optional label
      And I can type "Hello" into the text box
      But there is no error message

  Rule: Errored Input
    Background:
      Given I have an Input with error component on page

    Scenario: I have an Errored Input component on page
      Then there is a label
      And there is a hint
      And there is an optional label
      And there is an error message
      And I can type "Hello" into the text box
