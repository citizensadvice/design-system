Feature: Footer component

  The footer component shows users of the site useful links
  in different categories. It also shows legal information
  and a way to submit feedback about the page you are on.

  Rule: Default Footer
    Scenario: Footer contains a variety of links / content
      Given the Default Footer component is on the page
      Then a report problem with this page link is present
      And each header item has at least 1 link below it
      And a logo is present
      And a company info is present

  Rule: Minimal Footer
    Scenario: Footer contains a variety of links / content
      Given the Minimal Footer component is on the page
      Then a logo is present
      And a company info is present
