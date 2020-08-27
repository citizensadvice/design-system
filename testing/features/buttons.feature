Feature: Buttons components

  The Button components gives the current site a variety of means of
  providing means to submit data

  Background:
    Given the Buttons component is on the page

  Scenario: Primary Button changes color when hovered over
    When I hover over the Primary Button
    Then the background color changes

  Scenario: Primary Button changes color when clicked on
    When I click on the Primary Button
    Then the background color changes
    And the text color changes

  Scenario: Secondary Button changes color when hovered over
    When I hover over the Secondary Button
    Then the background color changes

  Scenario: Secondary Button changes color when clicked on
    When I click on the Secondary Button
    Then the background color changes
    And the text color changes

  Scenario: Tertiary Button changes color when hovered over
    When I hover over the Tertiary Button
    Then the background color changes

  Scenario: Tertiary Button changes color when clicked on
    When I click on the Tertiary Button
    Then the background color changes
    And the text color changes

  Scenario: Tertiary button has different text than the other two
    Then the Tertiary button text is less prominent than the Primary Button
    And the Tertiary button text is less prominent than the Secondary Button
    
