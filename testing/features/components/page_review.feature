Feature: Page review component

  The page review component reassures the reader that the content
  they are viewing is up to date

  Scenario: Page last reviewed date
    Given a page review component is on the page
    Then the date that the page was last reviewed is present
    And the date is bold
