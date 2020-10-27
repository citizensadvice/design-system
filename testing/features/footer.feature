Feature: Footer component

  The footer component shows users of the site useful links
  in different categories. It also shows legal information
  and a way to submit feedback about the page you are on.

  Background:
    Given a Footer component is on the page

  Scenario: Footer is present
    Then a report problem with this page link is present
    And each header item has at least 1 link below it
    And a footer logo is present
    And a copyright notice is present
    And a company info is present

  Scenario: Report a problem with this page
    When I report a problem with this page
    Then a new tab is opened to report an issue with the page
