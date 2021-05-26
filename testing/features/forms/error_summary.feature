Feature: Error Summary form

  The Error Summary form shows users of the site when a form
  entry is invalid, and what they can do to rectify it

  Rule: Example Error Summary
    Background:
      Given an Example Error Summary form is on the page

    Scenario: Error Labels are informative and easy to understand for all types of user
      Then the component indicates there is a problem
      And the component shows the errors in a list format
      And there is an error for each bullet point
