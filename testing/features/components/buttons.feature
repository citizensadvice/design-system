Feature: Button components

  The Button components give the current site a variety of ways of
  allowing users to submit data

  NB: Due to these buttons being very visual and the behaviour changing
  dependent on each browser, we will validate them with some rigorous VRT tests

  Rule: Primary Button
    Scenario: Ensure button is of correct type
      Given the Primary Button component is on the page
      Then the Primary button acts as a button

  Rule: Secondary Button
    Scenario: Ensure button is of correct type
      Given the Secondary Button component is on the page
      Then the Secondary button acts as a button

  Rule: Tertiary Button
    Scenario: Ensure button is of correct type
      Given the Tertiary Button component is on the page
      Then the Tertiary button acts as a button

  Rule: Link Buttons
    Scenario: Ensure buttons are of correct type
      Given the Link Button components are on the page
      Then the Link buttons act as buttons
