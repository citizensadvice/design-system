Feature: Search components

  The Search component allows users to search for the desired term and consists
  of a search field and a button. The variant 'Search with value' has a
  pre-defined value in the search field.

  Rule: Standard Search
    Background:
      Given a Standard Search component is on the page

    Scenario: Search component is on the page without any value
      Then the search field is clear
      And I can search for "Anything"

  Rule: Search with value
    Background:
      Given a Search With Value component is on the page

    Scenario: Search component is on the page with a pre-defined value
      Then I can search for the pre-defined value "Current search term"

    Scenario: It is possible to change the pre-defined value
      Then the search field is filled with "Current search term"
      And I can delete the pre-defined value
      And I can search for "Something new"

