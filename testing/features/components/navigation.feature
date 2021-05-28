@not_ios13 @not_ios12 @not_safari
Feature: Navigation component

  The greedy navigation displays as many navigation links that will fit on the viewport.
  Any that don't fit are added into an expandable dropdown.

  Rule: Default Navigation - large screens
    Background:
      Given a Default Navigation component is on the page

    @not_mobile @not_tablet
    Scenario: All navigation links are shown
      Then the dropdown toggle is not present

  Rule: Default Navigation - small screens
    Background:
      Given a Default Navigation component is on the page
      And the navigation does not fit on the screen

    Scenario: The default state is to hide some navigation links
      Then the dropdown menu is closed

    Scenario: More/Less navigation links can be viewed by opening/closing the dropdown
      Then I can open the dropdown menu
      And I can close the dropdown menu

    @not_mobile @not_tablet
    Scenario: Tabbing into the dropdown toggle automatically opens the dropdown menu
      When I tab onto the More button
      Then the Close button is present
      And the dropdown menu is open

    @failing @NP-1755 @not_mobile @not_tablet
    Scenario: Tabbing out of the dropdown menu automatically closes it
      When I open the dropdown menu
      And I tab out of the dropdown menu
      Then the dropdown menu is closed

    Scenario: You can close the dropdown menu using your Keyboard
      When I open the dropdown menu
      And I press 'Escape'
      Then the dropdown menu is closed

    @not_mobile @not_tablet @NP-1766
    Scenario: You can close the dropdown menu by clicking outside of it
      When I open the dropdown menu
      And I click outside of the menu
      Then the dropdown menu is closed

  Rule: Default Navigation - logged in users on small screens
    Background:
      Given a user is logged in
      And a Default Navigation component is on the page
      And the navigation does not fit on the screen

    Scenario: Header links are displayed in the dropdown nav on mobiles
      When I open the dropdown menu
      Then the dropdown menu has header links
