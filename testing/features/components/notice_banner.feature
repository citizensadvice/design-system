Feature: Notice Banner

  The notification banner informs the user about something they need to know
  about, usually related to the page content.

  Scenario: Notice Banner is present on the page
    Given an Example Notice Banner component is on the page
    Then a notice banner title and message are present
