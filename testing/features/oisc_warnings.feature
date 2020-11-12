Feature: OISC Warning components

  The OISC Warning components allow content managers to provide options
  to warn users about something important; in a variety of ways

  Rule: OISC With Title and Description
    Background:
      Given a Title and Description OISC component is on the page

    Scenario: OISC component has a title and message
      Then the OISC title is visible
      And the OISC message is visible

  Rule: OISC With Title only
    Background:
      Given a Title Only OISC component is on the page

    Scenario: OISC component has a title
      Then the OISC title is visible
      But the OISC message is not visible

  Rule: Sticky OISC
    Background:
      Given a Sticky OISC component is on the page

    Scenario: English OISC component has a title and message
      Then the OISC title is visible
      And the OISC message is visible

    Scenario: Welsh OISC component has a title and message
      Given the language is Welsh
      Then the OISC title is visible
      And the OISC message is visible

    @not_mobile @NP-1230
    Scenario: Sticky component follows you down the page
      When I scroll to the bottom of the page
      Then the OISC component is visible at the top of the viewport

    @not_mobile @NP-1230
    Scenario: Sticky component can be closed off
      When I scroll to the bottom of the page
      And I close the sticky component
      Then the OISC component is no longer visible at the top of the viewport

    Scenario: Sticky component is no longer sticky after being closed
      When I scroll to the bottom of the page
      And I close the sticky component
      And I scroll to the top of the page
      And I scroll to the bottom of the page
      Then the component will not be closeable
