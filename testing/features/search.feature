Feature: Search components

  The Search component allows users to search for the desired term and consists
  of a search field and a button.

  Rule: Standard Search
    Background:
      Given a Standard Search component is on the page

    Scenario: English Search component is on the page without any term
      Then the search field is clear
      And I am able to search in English

    Scenario: Welsh Search component is on the page without any term
      Given the language is Welsh
      Then the search field is clear
      And I am able to search in Welsh

  Rule: Search with Value
    Background:
      Given a Search With Value component is on the page

    Scenario: English Search component is on the page with a pre-defined term
      Then the search field has a pre-defined term
      And I am able to search in English

    Scenario: Welsh Search component is on the page with a pre-defined term
      Given the language is Welsh
      Then the search field has a pre-defined term
      And I am able to search in Welsh
