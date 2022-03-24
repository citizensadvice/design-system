Feature: Search components
  Rule: Standard Search
    Scenario: Search component is on the page without any term
      Given a Standard Search component is on the page
      Then the search field is clear
      And I am able to search

  Rule: Search with Value
    Scenario: Search component is on the page with a pre-defined term
      Given a Search With Value component is on the page
      Then the search field has a pre-defined term
      And I am able to search
