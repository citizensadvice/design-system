Feature: Callout components

  The Callout components notify users of important information
  that they must adhere to or be aware of

  Rule: Standard Callout
    Background:
      Given a Standard Callout component is on the page

    Scenario: English Callout contains a title and message
      Then a callout title and message are present
      But no label is present above the callout title

    Scenario: Welsh Callout contains a title and message
      Given the language is Welsh
      Then a callout title and message are present
      But no label is present above the callout title

  Rule: Example Callout
    Background:
      Given an Example Callout component is on the page

    Scenario: English Callout contains a title, message and warning
      Then a callout title and message are present
      And an "Example" label is present above the callout title

    Scenario: Welsh Callout contains a title, message and warning
      Given the language is Welsh
      Then a callout title and message are present
      And an "Example" label is present above the callout title

  Rule: Important Callout
    Background:
      Given an Important Callout component is on the page

    Scenario: English Callout contains a title, message and warning
      Then a callout title and message are present
      And an "Important" label is present above the callout title

    Scenario: Welsh Callout contains a title, message and warning
      Given the language is Welsh
      Then a callout title and message are present
      And an "Important" label is present above the callout title

  Rule: Adviser Callout
    Background:
      Given an Adviser Callout component is on the page

    Scenario: English Callout contains a title, message and an adviser label
      Then a callout title and message are present
      And an "Adviser" label is present above the callout title

    Scenario: Welsh Callout contains a title, message and an adviser label
      Given the language is Welsh
      Then a callout title and message are present
      And an "Adviser" label is present above the callout title

  Rule: Nested Callouts
    Background:
      Given a Nested Callout component is on the page

    Scenario: Callouts are not altered when nested
      Then the outer callout is rendered correctly
      And the inner callout is rendered correctly
      
