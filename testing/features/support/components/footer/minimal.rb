# frozen_string_literal: true

module Footer
  class Minimal < ::Base
    set_url "/iframe.html?id=components-footer--minimal&viewMode=story"

    section :initial_form, ".cads-footer" do
      element :logo, ".cads-logo"
      element :copyright, ".cads-footer__company-info div p:nth-of-type(1)"
      element :company_info, ".cads-footer__company-info div p:nth-of-type(2)"
    end

    def validate_initial_state!
      has_initial_form?(wait: 5)
    end
  end
end
