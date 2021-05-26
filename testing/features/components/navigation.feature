@future_release @v4.0.5+
Feature: Navigation component

  The greedy navigation displays as many navigation links that will fit on the viewport.
  Any that don't fit are added into an expandable dropdown.

  Rule: Default Navigation
    Background:
      Given a Default Navigation component is on the page

    @not_mobile @not_tablet
    Scenario: All links fit onto the screen
      Then the dropdown toggle is not present

    Scenario: Screen is too narrow to show all the links
      Given the navigation does not fit on the screen
      Then the dropdown toggle is present
      And the dropdown menu is closed

    Scenario: Clicking the more button shows the dropdown menu
      Given the navigation does not fit on the screen
      When I open the dropdown menu
      Then the dropdown menu is open

    Scenario: Clicking the close button hides the dropdown menu
      Given the dropdown menu is already open
      When I close the dropdown menu
      Then the dropdown menu is closed

    @not_mobile @not_tablet
    Scenario: Tabbing onto the dropdown toggle opens the dropdown menu
      Given the navigation does not fit on the screen
      And the dropdown toggle is present
      When I tab onto the More button
      Then the Close button is present
      And the dropdown menu is open

    @failing @NP-1755 @not_mobile @not_tablet
    Scenario: Tabbing out of the dropdown menu closes it
      Given the dropdown menu is already open
      When I tab out of the dropdown menu
      Then the More button is present
      And the dropdown menu is closed

    Scenario: You can close the dropdown menu with 'Esc'
      Given the dropdown menu is already open
      When I press 'Escape'
      Then the dropdown menu is closed
      And the More button is present

    @not_mobile @not_tablet @NP-1766
    Scenario: You can close the dropdown menu by clicking outside of it
      Given the dropdown menu is already open
      When I click outside of the menu
      Then the dropdown menu is closed
      And the More button is present

  Rule: Mobile View
    Background:
      Given a user is logged in
      And a Default Navigation component is on the page

    Scenario: Header links are displayed in the dropdown nav on mobiles
      Given the navigation does not fit on the screen
      When I open the dropdown menu
      Then the dropdown menu has header links
