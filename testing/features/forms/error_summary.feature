Feature: Error Summary form

  The Error Summary form shows users of the site when a form
  entry is invalid, and what they can do to rectify it

  Rule: Example Error Summary
    Background:
      Given an Example Error Summary form is on the page

    Scenario: Error Labels are informative and easy to understand for all types of user
      Then the form indicates there is a problem
      And the form shows the errors in a list format
