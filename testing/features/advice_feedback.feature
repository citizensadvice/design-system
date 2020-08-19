Feature: Advice Feedback component

  The Advice Feedback component allows users of the current site to provide
  feedback on their current browsing session

  Background:
    Given an Advice Feedback component is on the page

  Scenario: Validate initial state
    Then the header says "Advice feedback"
    And I am able to provide feedback

  Scenario: User giving positive feedback
    When I inform Citizens Advice that the advice was useful
    Then I am thanked for providing feedback

  Scenario: User giving detailed free-text negative feedback
    When I inform Citizens Advice that the advice was not useful
    And I offer a typed reason for why the advice was not useful
    Then I am thanked for providing feedback

  Scenario: User giving detailed negative feedback with a specific reason
    When I inform Citizens Advice that the advice was not useful
    And I select a reason that the advice was not useful
    Then I am thanked for providing feedback

  Scenario: User changing their mind about feedback
    When I inform Citizens Advice that the advice was not useful
    And I change my mind about giving feedback
    Then I am able to provide feedback

  Scenario: Users wanting to give negative feedback should be prompted for more info
    When I inform Citizens Advice that the advice was not useful
    Then I must provide more information

  Scenario: Users cannot submit negative feedback with no additional information
    When I inform Citizens Advice that the advice was not useful
    And I try to submit the form without providing any feedback
    Then I am forced to provide feedback
