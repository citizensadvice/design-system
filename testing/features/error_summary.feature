Feature: Error Summary component

  The Error Summary component shows users of the site when a form/input
  entry is invalid, and what they can do to rectify it

  Background:
    Given an Error Summary component is on the page

  Scenario: Validate initial state
    Then the component will indicate there has been a problem

  Scenario: Error Labels are informative and easy to understand for all types of user
    Then the component should list the issues in bullet point format
    And the number of errors should equal the number of bullet points
