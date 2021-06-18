Feature: Callout components

  The Callout components notify users of important information
  that they must adhere to or be aware of

  Rule: Standard Callout
    Scenario: Callout contains a title and message
      Given a Standard Callout component is on the page
      Then a callout title and message are present
      But no label is present above the callout title

  Rule: Example Callout
    Scenario: Callout contains a title, message and warning
      Given an Example Callout component is on the page
      Then a callout title and message are present
      And an "Example" label is present above the callout title

  Rule: Important Callout
    Scenario: Callout contains a title, message and warning
      Given an Important Callout component is on the page
      Then a callout title and message are present
      And an "Important" label is present above the callout title

  Rule: Adviser Callout
    Scenario: Callout contains a title, message and an adviser label
      Given an Adviser Callout component is on the page
      Then a callout title and message are present
      And an "Adviser" label is present above the callout title

  Rule: Nested Callouts
    Scenario: Callouts are not altered when nested
      Given there are Nested Callout components on the page
      Then both callouts are rendered correctly
