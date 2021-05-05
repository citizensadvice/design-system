@not_tablet
Feature: Header component

  The Header component allows users to perform some quick tasks
  - Login / Logout
  - Change Language Between English and Welsh
  - Make a search

  It also allows the user as per new WCAG Guidelines to skip the top part
  of the page and move straight to the Navigation/Content/Footer by using
  their "Tab" key on the keyboard

  Background:
    Given a Standard Header component is on the page

  Rule: A Standard Header (Screen size agnostic)
    Scenario: English Header has a search option
      Then I am able to search in English

    Scenario: Welsh Header has a search option
      Given the language is Welsh
      Then I am able to search in Welsh

  Rule: A Standard Header (Large Screen)
    @not_mobile
    Scenario: English Header has some quick links
      Then a link to change language is present
      And a login link is present
      And a logo is present

    @not_mobile
    Scenario: Welsh Header has some quick links
      Given the language is Welsh
      Then a link to change language is present
      And a login link is present
      And a logo is present

    @not_mobile
    Scenario Outline: English Users can quickly navigate to various areas of the page
      Then I am able to skip to the <area> part of the page

      Examples:
        | area       |
        | navigation |
        | content    |
        | footer     |

    @not_mobile
    Scenario Outline: Welsh Users can quickly navigate to various areas of the page
      Given the language is Welsh
      Then I am able to skip to the <area> part of the page

      Examples:
        | area       |
        | navigation |
        | content    |
        | footer     |

  Rule: A Standard Header (Small Screen)
    @small_screen
    Scenario: English Header can be expanded to show the full search bar
      Then I can expand the search bar
      And I can collapse the search bar

    @small_screen
    Scenario: Welsh Header can be expanded to show the full search bar
      Given the language is Welsh
      Then I can expand the search bar
      And I can collapse the search bar
