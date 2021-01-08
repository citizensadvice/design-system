Feature: Targeted Content component

  The Targeted Content component allows content managers
  to store important information behind an expandable bar

  Rule: Default Targeted Content
    Background:
      Given a Default Targeted Content component is on the page

    Scenario: Content has a clear title and expand button
      Then the title is present
      And a button to expand is present

    Scenario: Content can be expanded to reveal more information
      When I expand the targeted content
      Then I can see additional information

    Scenario: Content can be collapsed after being expanded
      When I expand the targeted content
      And I collapse the targeted content
      Then I can no longer see the additional information

    Scenario: Content can be closed after being expanded
      When I expand the targeted content
      And I close the targeted content
      Then I can no longer see the additional information

  Rule: Anchored Targeted Content
    Background:
      Given a Anchored Targeted Content component is on the page

    Scenario: Content has a clear title and expand button
      Then the title is presentAnd a button to expand is present

    Scenario: Content can be expanded to reveal more information
      When I expand the targeted content
      Then I can see additional information

    Scenario: Content can be collapsed after being expanded
      When I expand the targeted content
      And I collapse the targeted content
      Then I can no longer see the additional information

    Scenario: Content can be closed after being expanded
      When I expand the targeted content
      And I close the targeted content
      Then I can no longer see the additional information

    Scenario: Content can be be auto-scrolled to
      When I jump to the targeted content
      Then the targeted content is scrolled into view
      And I can see additional information

    Scenario: Content is not auto-opened when scrolled to, if previously interacted with
      When I expand the targeted content
      And I close the targeted content
      And I jump to the targeted content
      Then the targeted content is scrolled into view
      But I can no longer see the additional information
