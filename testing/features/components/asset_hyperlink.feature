Feature: Asset Hyperlink component

  The Asset Hyperlink component allows content managers to provide an
  easy way for users to download files

  Scenario: Label is informative and contains lots of easy to understand info
    Given an Asset Hyperlink component is on the page
    Then a link to the PDF is present
    And the label includes a name at the beginning
    And the label includes the file size
    And the label is a downloadable link
