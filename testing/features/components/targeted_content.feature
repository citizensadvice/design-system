Feature: Targeted Content component

  The Targeted Content component allows content managers
  to store important information behind an expandable bar

  Rule: Default Targeted Content
    Background:
      Given a default targeted content component is on the page

    Scenario: Targeted content has a clear title and expand button
      Then a targeted content title is present
      And the toggle button indicates it will expand

    Scenario: Targeted content can be expanded to reveal more information
      When I expand the targeted content
      Then I can see additional information
      And the toggle button indicates it will collapse
      And I can see a close button

    Scenario: Targeted content can be collapsed after being expanded
      When I expand the targeted content
      And I collapse the targeted content
      Then I can no longer see additional information

    Scenario: Targeted content can be closed after being expanded
      When I expand the targeted content
      And I close the targeted content
      Then I can no longer see additional information

  Rule: Adviser Targeted Content
    Scenario: Adviser targeted content contains an adviser label
      Given an adviser targeted content component is on the page
      And an "Adviser" label is present above the callout title

  Rule: Anchored Targeted Content
    Scenario: Targeted content can be be auto-opened
      Given an anchored targeted content component is on the page
      When I jump to the targeted content
      Then I can see additional information

  Rule: Fallback Targeted Content
    Scenario: Fallback content has no open/close options
      Given a fallback targeted content component is on the page
      Then I can see additional information
      And I cannot close or collapse the content
