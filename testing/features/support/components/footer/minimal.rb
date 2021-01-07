# frozen_string_literal: true

module Footer
  class Minimal < ::Base
    set_url "/iframe.html?id=components-footer--minimal&viewMode=story"

    element :logo, ".cads-logo"
    element :copyright, "[data-testid='copyright']"
    element :company_info, "[data-testid='legal-summary']"
  end
end
