Feature: Error Summary component

  The Error Summary component shows users of the site when a form/input
  entry is invalid, and what they can do to rectify it

  Rule: Example Error Summary
    Background:
      Given an Example Error Summary component is on the page

    Scenario: Error Labels are informative and easy to understand for all types of user
      Then the component indicates there is a problem
      And the component lists the issues in bullet point format
      And there is an error for each bullet point
