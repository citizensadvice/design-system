@future_release @v4.0.0+
Feature: Footer component

  The footer component shows users of the site useful links
  in different categories. It also shows legal information
  and a way to submit feedback about the page you are on.

  Rule: Default Footer
    Background:
      Given the Default Footer component is on the page

    Scenario: English Footer contains a variety of links / content
      Then a report problem with this page link is present
      And each header item has at least 1 link below it
      And a logo is present
      And a copyright notice is present
      And a company info is present

    Scenario: Welsh Footer contains a variety of links / content
      Given the language is Welsh
      Then a report problem with this page link is present
      And each header item has at least 1 link below it
      And a logo is present
      And a copyright notice is present
      And a company info is present

    @not_mobile
    Scenario: Users can report a problem about the specific page they are on
      When I report a problem with this page
      Then I am presented with a form to report the issue about the page I am on

  Rule: Minimal Footer
    Background:
      Given the Minimal Footer component is on the page

    Scenario: English Footer contains a variety of links / content
      Then a footer logo is present
      And a copyright notice is present
      And a company info is present

    Scenario: Welsh Footer contains a variety of links / content
      Given the language is Welsh
      Then a footer logo is present
      And a copyright notice is present
      And a company info is present
