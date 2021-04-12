Feature: Pagination

  The pagination helps users navigate through multiple pages.
  Typically used for pages of search results.

  Rule: Example
    Background:
      Given an Example Pagination component is on the page

    Scenario: All the pagination elements are present on the page
      Then the current page is highlighted
      And there are numerical buttons to skip to the 2 previous pages
      And there are numerical buttons to skip to the 2 next pages
      And there are buttons to skip to the first and last page
      And there are buttons to skip to the next and previous page

  Rule: Paging Info
    Background:
      Given a Paging Info Pagination component is on the page

    Scenario: Paging Info is present on the page
      Then the number of pages is displayed
