Feature: Contact Details component

  The Contact Details component provides users with full contact information
  so that they can contact the relevant authority via different methods

  Background:
    Given a Contact Details component is on the page

  Scenario: Validate initial state
    Then the header says "Contact Details"
    And a contact details block of text is present

  Scenario: Ensure component is of correct size/format
    Then there is at least 1 paragraph
    And the top paragraph is bold
