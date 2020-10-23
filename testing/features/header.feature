Feature: Header component

  The Header component allows users to perform some quick tasks
  - Login / Logout
  - Change Language Between English and Welsh
  - Make a search

  Rule: Logged out Header
    Background:
      Given a Logged out Header component is on the page

    Scenario: Header has some quick links
      Then a language change link is present
      And a login link is present
      And a logo is present

    Scenario: Header has a search option
      When I type "Immigration" into the search box
      Then I can search for "Immigration"

  Rule: Logged in Header
    Background:
      Given a Logged in Header component is on the page

    @future_release @NP-1137
    Scenario: Header has some quick links
      Then a language change link is present
      And a logout link is present
      And a logo is present

    @future_release @NP-1137
    Scenario: Header has a search option
      When I type "Immigration" into the search box
      Then I can search for "Immigration"
