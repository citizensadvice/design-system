# frozen_string_literal: true

module Footer
  class Minimal < ::Base
    set_url "/iframe.html?id=components-footer--minimal&viewMode=story"

    element :logo, ".cads-logo"
    element :copyright, ".cads-footer__company-info div p:nth-of-type(1)"
    element :company_info, ".cads-footer__company-info div p:nth-of-type(2)"
  end
end
