Feature: Header component
  # @TODO: Migrate this to Cypress
  Rule: A Standard Header (Small Screen)
    @small_screen
    Scenario: Header can be expanded to show the full search bar
      Then I can expand the search bar
      And I can collapse the search bar
