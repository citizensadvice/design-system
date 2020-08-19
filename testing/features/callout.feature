Feature: Callout component

  The Callout component notifies users of important information that they must adhere to

  Background:
    Given a Callout component is on the page

  Scenario: Validate initial state
    Then the header says "Callout"
    And a callout title and message are present

  Scenario: Ensure component has an "Important" label
    Then an "Important" label is present above the callout title
