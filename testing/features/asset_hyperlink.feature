Feature: Asset Hyperlink component

  The Asset Hyperlink component allows content managers to provide an
  easy way for users to download files

  Background:
    Given an Asset Hyperlink component is on the page

  Scenario: Validate initial state
    Then a link to the PDF is present

  Scenario: Label is informative and easy to understand for all types of user
    Then the label includes a name at the beginning
    And the label includes an icon
    And the label includes the file size
    And the label is a downloadable link
