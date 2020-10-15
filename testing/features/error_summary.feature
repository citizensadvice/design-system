Feature: Error Summary component

  The Error Summary component shows users of the site when a form/input
  entry is invalid, and what they can do to rectify it

  Background:
    Given an Error Summary component is on the page

  Scenario: Validate initial state
    When an error is generated (By any applicable means)
    Then the component will indicate there has been a problem

  Scenario: Error Labels are informative and easy to understand for all types of user
    Given there is a generated error
    Then the component should list the issues in bullet point format

  Scenario: Quantity of Errors should match information presented to user
    Given there is a list of generated errors in bullet point format
    Then the number of errors should equal the number of bullet points
    
