Feature: Buttons components

  The Button components gives the current site a variety of means of
  providing means to submit data

  Background:
    Given the Buttons component is on the page

  @future_release @v1.9.4+
  Scenario: Validate initial state
    Then all the buttons are present

  @future_release @v1.9.4+
  Scenario: Primary Button changes color when hovered over
    When I hover over the Primary Button
    Then the background color of the Primary Button changes

  Scenario: Primary Button changes color when clicked on
    When I click on the Primary Button
    Then the background color of the Primary Button changes

  @future_release @v1.9.4+
  Scenario: Secondary Button changes color when hovered over
    When I hover over the Secondary Button
    Then the background color of the Secondary Button changes

  Scenario: Secondary Button changes color when clicked on
    When I click on the Secondary Button
    Then the background color of the Secondary Button changes
    And the text color of the Secondary Button changes

  @future_release @v1.9.4+
  Scenario: Tertiary Button changes color when hovered over
    When I hover over the Tertiary Button
    Then the background color of the Tertiary Button changes

  Scenario: Tertiary Button changes color when clicked on
    When I click on the Tertiary Button
    Then the background color of the Tertiary Button changes
    And the text color of the Tertiary Button changes

  #Scenario: Tertiary button has less prominent text
  #  Then the Tertiary button text is less prominent than the Primary Button
  #  And the Tertiary button text is less prominent than the Secondary Button
