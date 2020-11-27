Feature: Search components

  The Search component allows users to search for the desired term and consists
  of a search field and a button.

  Rule: Standard Search
    Background:
      Given a Standard Search component is on the page

    Scenario: Search component is on the page without any value
      Then the search field is clear
      And User is able to search for "Anything"

  Rule: Search with value
    Background:
      Given a Search With Value component is on the page

    Scenario: Search component is on the page with a pre-defined value
      Then User is able to search the pre-defined value "Current search term"

    Scenario: It is possible to change the pre-defined value
      Then the search field is filled with "Current search term"
      And I can delete the pre-defined value
      And User is able to search for "Something new"

