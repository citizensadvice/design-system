Feature: Contact Details component

  The Contact Details component provides users with full contact information
  so that they can contact the relevant authority via different methods

  Scenario: Contact information is present
    Given a Contact Details component is on the page
    Then there is at least 1 paragraph
    And the top paragraph is bold
