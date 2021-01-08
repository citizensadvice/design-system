Feature: Targeted Content component

  The Targeted Content component allows content managers
  to store important information behind an expandable bar

  Rule: Default Targeted Content
    Background:
      Given a Default Targeted Content component is on the page

    @failing @missing_label_issue
    Scenario: English Content has a clear title and expand button
      Then a targeted content title is present
      And the expand/collapse button will indicate it will expand

    @failing @missing_label_issue
    Scenario: Welsh Content has a clear title and expand button
      Given the language is Welsh
      Then a targeted content title is present
      And the expand/collapse button will indicate it will expand

    @failing @missing_label_issue
    Scenario: English Content can be expanded to reveal more information
      When I expand the targeted content
      Then I can see additional information
      And the expand/collapse button will indicate it will collapse
      And I can see a close button

    @failing @missing_label_issue
    Scenario: Welsh Content can be expanded to reveal more information
      Given the language is Welsh
      When I expand the targeted content
      Then I can see additional information
      And the expand/collapse button will indicate it will collapse
      And I can see a close button

    Scenario: Content can be collapsed after being expanded
      When I expand the targeted content
      And I collapse the targeted content
      Then I can no longer see additional information

    Scenario: Content can be closed after being expanded
      When I expand the targeted content
      And I close the targeted content
      Then I can no longer see additional information

  Rule: Anchored Targeted Content
    Background:
      Given an Anchored Targeted Content component is on the page

    @failing @missing_label_issue
    Scenario: English Content has a clear title and expand button
      Then a targeted content title is present
      And the expand/collapse button will indicate it will expand

    @failing @missing_label_issue
    Scenario: Welsh Content has a clear title and expand button
      Given the language is Welsh
      Then a targeted content title is present
      And the expand/collapse button will indicate it will expand

    @failing @missing_label_issue
    Scenario: English Content can be expanded to reveal more information
      When I expand the targeted content
      Then I can see additional information
      And the expand/collapse button will indicate it will collapse
      And I can see a close button

    @failing @missing_label_issue
    Scenario: Welsh Content can be expanded to reveal more information
      Given the language is Welsh
      When I expand the targeted content
      Then I can see additional information
      And the expand/collapse button will indicate it will collapse
      And I can see a close button

    Scenario: Content can be collapsed after being expanded
      When I expand the targeted content
      And I collapse the targeted content
      Then I can no longer see additional information

    Scenario: Content can be closed after being expanded
      When I expand the targeted content
      And I close the targeted content
      Then I can no longer see additional information

    @future_release @v4.0.0+
    Scenario: Content can be be auto-opened
      When I jump to the targeted content
      Then I can see additional information

    @future_release @v4.0.0+
    Scenario: Content is not auto-opened, if previously interacted with
      When I expand the targeted content
      And I close the targeted content
      And I jump to the targeted content
      Then I can no longer see additional information
