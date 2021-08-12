Feature: Pagination

  The pagination helps users navigate through multiple pages.
  Typically used for pages of search results.

  Rule: Example Pagination
    Scenario: All of the pagination buttons are present on the page
      Given an Example Pagination component is on the page
      Then current page is displayed
      And there are numerical buttons to skip to the 2 previous pages
      And there are numerical buttons to skip to the 2 next pages
      And there are buttons to skip to the first and last page
      And there are buttons to skip to the next and previous page

  Rule: Paging Info Pagination
    Scenario: Number of results
      Given a Paging Info Pagination component is on the page
      Then the number of results is displayed
