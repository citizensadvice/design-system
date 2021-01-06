@future_release @v4.0.0+
Feature: Contact Details component

  The Contact Details component provides users with full contact information
  so that they can contact the relevant authority via different methods

  Background:
    Given a Contact Details component is on the page

  Scenario: Contact information is present
    Then there is at least 1 paragraph
    And the top paragraph is bold
