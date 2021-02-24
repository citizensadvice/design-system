Feature: Navigation component

  The greedy nav displays as many navigation links as fit on the viewport. 
  Any that don't fit are added into a expandable dropdown.

  Background:
    Given the navigation is on the page

    @not_mobile
    Scenario: all links fit onto the screen
        Then the dropdown toggle is not present

    Scenario: screen is too narrow to show all the links
        Given the navigation does not fit on the screen
        Then the dropdown toggle is present
        And the dropdown menu is closed

    Scenario: clicking the more button shows the dropdown menu
        Given the navigation does not fit on the screen
        When I open the dropdown menu
        Then the dropdown menu is open

    Scenario: clicking the close button hides the dropdown menu
        Given the dropdown menu is already open 
        When I close the dropdown menu
        Then the dropdown menu is closed

    Scenario: tabbing onto the dropdown toggle opens the dropdown menu
        Given the navigation does not fit on the screen
        And the dropdown toggle is present
        When I tab onto the More button 
        Then the Close button is present
        And the dropdown menu is open

    @failing @np-1755
    Scenario: tabbing out of the dropdown menu closes it
        Given the dropdown menu is already open
        When I tab out of the dropdown menu
        Then the More button is present
        And the dropdown menu is closed

    Scenario: you can close the dropdown menu with 'Esc'
        Given the dropdown menu is already open
        When I press 'Escape'
        Then the dropdown menu is closed
        And the More button is present

    Scenario: you can close the dropdown menu by clicking outside of it
        Given the dropdown menu is already open
        When I click outside of the menu
        Then the dropdown menu is closed
        And the More button is present
