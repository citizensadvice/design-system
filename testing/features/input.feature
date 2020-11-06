Feature: Input component

  The Input component represents a field for text input, the control associated
  with this field is a text box that allows users to edit a single line of plain
  text, providing means to submit data

  Rule: Basic
    Background:
      Given I have a Basic Input component on page

    Scenario: Input is on the page and I can type on it
      Then there is a label
      But there is no hint
      And there is no optional field
      And there is no error message
      Then I can type "Hello" into the text box

  Rule: With Hint
    Background:
      Given I have an Input with hint component on page

    Scenario: Input is on the page and has a hint
      Then there is a label
      And there is a hint
      And there is no optional field
      But there is no error message
      Then I can type "Hello" into the text box

  Rule: With Optional field
    Background:
      Given I have an Optional Input component on page

    Scenario: Input is on the page and it is optional
      Then there is a label
      And there is a hint
      And there is an optional field
      But there is no error message
      Then I can type "Hello" into the text box

  Rule: With Error
    Background:
      Given I have an Input with error component on page

    Scenario: Input is on the page but there is an error message
      Then there is a label
      And there is a hint
      And there is an optional field
      And there is an error message
      Then I can type "Hello" into the text box
