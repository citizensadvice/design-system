Feature: Navigation component with header links

  The greedy nav should display any header links when on a mobile view.

  Background:
    Given the navigation is on the page with header links

    Scenario: header links are displayed in the dropdown nav on mobiles
        Given the navigation does not fit on the screen
        When I click the More button
        Then the header links should be included in the dropdown menu
