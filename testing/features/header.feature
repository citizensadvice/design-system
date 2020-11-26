Feature: Header component

  The Header component allows users to perform some quick tasks
  - Login / Logout
  - Change Language Between English and Welsh
  - Make a search

  It also allows the user as per new WCAG Guidelines to skip the top part
  of the page and move straight to the Navigation/Content/Footer by using
  their "Tab" key on the keyboard

  Rule: A Standard Header
    Background:
      Given a Standard Header component is on the page

    @not_mobile @failing @NP-1235
    Scenario: Header has some quick links
      Then a link to change language is present
      And a login link is present
      And a header logo is present

    Scenario: Header has a search option
      Then I am able to search for "Anything"

    Scenario: User can Quickly Navigate to various Sections of the page
      When I skip to the <area> part of the page
      Then the URL will link me to the <area> part of the page
      
