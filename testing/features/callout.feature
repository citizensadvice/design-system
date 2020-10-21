Feature: Callout component

  The Callout component notifies users of important information
  that they must adhere to or be aware of

  Rule: Standard Callout
    Background:
      Given a Standard Callout component is on the page

    Scenario: Validate state of component
      Then a callout title and message are present
      And an "Important" label is present above the callout title

  Rule: Example Callout
    Background:
      Given an Example Callout component is on the page

    Scenario: Validate state of component
      Then a callout title and message are present
      And an "Example" label is present above the callout title
