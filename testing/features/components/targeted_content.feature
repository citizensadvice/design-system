Feature: Targeted Content component

  The Targeted Content component allows content managers
  to store important information behind an expandable bar

  Background:
    Given a targeted content component is on the page

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

  Scenario: Targeted content can be be auto-opened
    When I jump to the targeted content
    Then I can see additional information
