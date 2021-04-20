@not_tablet
Feature: Notice Banner

  The notification banner informs the user about something they need to know
  about, usually related to the page content.

  Background:
    Given a Standard Notice Banner component is on the page

  Scenario: Notice Banner is present on the page
    Then a notice banner title and message are present
