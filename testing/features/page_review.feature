Feature: Page Review component

  The Page Review component reassures the public that the content
  they are viewing is up to date

  Rule: Standard Page Review text
    Background:
      Given a Standard Page Review component is on the page

    Scenario: Label includes the date
      Then the date that the page was last reviewed is present
      And the date is bold
