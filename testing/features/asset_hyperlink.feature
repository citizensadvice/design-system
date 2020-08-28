Feature: Asset Hyperlink component

  The Asset Hyperlink component allows content managers to provide an
  easy way for users to download files

  Background:
    Given an Asset Hyperlink component is on the page

  Scenario: Validate initial state
    Then the header says "Asset hyperlink"
    And a link to download a PDF is present

  Scenario: Label is easy to read and informative for users with Accessibility needs
    Then the label includes a name at the beginning
    And the label includes an icon
    And the label includes the file size
    And the label is a downloadable link
