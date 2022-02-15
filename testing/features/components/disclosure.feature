Feature: Disclosure

  Rule: Example Disclosure
    Background:
      Given a Disclosure component is on the page

    Scenario: Disclosure can be expanded to reveal more content
      When I open/close the disclosure component
      Then The disclosure component displays expanded content

    Scenario: Close the filter panel
      When I open the disclosure component
      And I close the disclosure component
      Then The disclosure component no longer shows any expanded content
