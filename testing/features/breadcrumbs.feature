@future_release @v1.11.0+
Feature: Breadcrumbs component

  The Breadcrumbs component allows users to see a navigable path to their
  previous content pages they have traversed through


  Background:
    @future_release @v1.11.0+
    Given a Breadcrumbs component is on the page

  @future_release @v1.11.0+
  Scenario: Validate initial state
    Then a series of breadcrumbs are present

  @future_release @v1.11.0+
  Scenario: Breadcrumbs only link up till the last one
    Then the initial breadcrumbs are all links
    But the final breadcrumb isn't a link
