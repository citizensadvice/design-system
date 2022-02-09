Feature: Breadcrumbs component

  The Breadcrumbs component allows users to see a navigable path to their
  previous content pages they have traversed through

  Rule: Default Breadcrumb
    This collapses down when viewing on small screen sizes (mobiles etc)
    This is the same as the Long Titles Breadcrumb component
    Background:
      Given a Default Breadcrumbs component is on the page

    Scenario: On large devices breadcrumbs only link up till the last one
      Then a series of breadcrumbs are present
      And the initial breadcrumbs are all links
      But the final breadcrumb isn't a link

    @small_screen
    Scenario: On small devices the breadcrumbs collapse
      Then the only breadcrumb is a link

  Rule: No Collapse Breadcrumb
    This does not collapse for any screen size (Even mobile)
    This is the same as the Site Wide Breadcrumb component
    Scenario: Breadcrumbs only link up till the last one
      Given a No Collapse Breadcrumbs component is on the page
      Then a series of breadcrumbs are present
      And the initial breadcrumbs are all links
      But the final breadcrumb isn't a link
