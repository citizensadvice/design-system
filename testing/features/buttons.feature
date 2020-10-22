Feature: Button components

  The Button components gives the current site a variety of means of
  providing means to submit data

  NB: Due to these buttons being very visual and the behaviour changing
  dependent on each browser, we will validate them with some rigorous VRT tests

  Rule: Primary Button
    Background:
      Given the Primary Button component is on the page

    Scenario: Ensure button is of correct type
      Then the Primary button acts as a button

  Rule: Secondary Button
    Background:
      Given the Secondary Button component is on the page

    Scenario: Ensure button is of correct type
      Then the Secondary button acts as a button

  Rule: Tertiary Button
    Background:
      Given the Tertiary Button component is on the page

    Scenario: Ensure button is of correct type
      Then the Tertiary button acts as a button
