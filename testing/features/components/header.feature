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
      Then I am able to search

  Rule: A Standard Header (Large Screen)
    Scenario: English Header has some quick links
      Then a link to change language is present
      And a login link is present
      And a logo is present

    Scenario: Users can quickly navigate to various areas of the page
      Then I am able to tab through skip links
        | Skip to navigation | Skip to content | Skip to footer |

  Rule: A Standard Header (Small Screen)
    @small_screen
    Scenario: Header can be expanded to show the full search bar
      Then I can expand the search bar
      And I can collapse the search bar
