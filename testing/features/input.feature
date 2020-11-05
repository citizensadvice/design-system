Feature: Input
  As a non-technical person at Citizens Advice
  I want to know the full specification of what an “Input” component can / should do
  So I can check whether it is being used correctly
  And I can check if is buggy

  Rule: Basic
    Background:
      Given I have a Basic Input component on page

    Scenario: Basic Input is on the page and accepts data.
      Then there is a label
      But there is no hint
      And there is no optional field
      And there is no error message
      Then I can type "Hello" into the text box

  Rule: With Optional field
    Background:
      Given I have an Input with hint component on page

    Scenario:
      Then there is a label
      And there is no hint
      And there is an optional field
      But there is no error message
      Then I can type "Hello" into the text box

  Rule: With Optional field
    Background:
      Given I have an Optional Input component on page

    Scenario:
      Then there is a label
      And there is a hint
      And there is an optional field
      But there is no error message
      Then I can type "Hello" into the text box

  Rule: With Error
    Background:
      Given I have an Input with error component on page

    Scenario:
      Then there is a label
      And there is a hint
      And there is an optional field
      And there is an error message
      Then I can type "Hello" into the text box
