Feature: Callout component

  The Callout component notifies users of important information
  that they must adhere to or be aware of

  Background:
    Given a Callout component is on the page

  Scenario: Validate state of component
    Then a callout title and message are present
    And an "Important" label is present above the callout title
