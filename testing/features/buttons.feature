Feature: Buttons components

  The Button components gives the current site a variety of means of
  providing means to submit data

  NB: Due to these buttons being very visual and the behaviour changing
  dependent on each browser, we will validate them with some rigorous VRT
  tests later on, and not test any behaviour here

  Background:
    Given the Buttons component is on the page

  Scenario: Validate initial state
    Then all the buttons are present
