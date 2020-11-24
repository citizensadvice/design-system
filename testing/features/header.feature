Feature: Header component

  The Header component allows users to perform some quick tasks
  - Login / Logout
  - Change Language Between English and Welsh
  - Make a search

  Rule: A Standard Header
    Background:
      Given a Standard Header component is on the page

    Scenario: Header has some quick links
      Then a link to change language is present
      And a login link is present
      And a header logo is present

    Scenario: Header has a search option
      Then I am able to search for "Anything"
