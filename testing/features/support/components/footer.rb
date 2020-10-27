# frozen_string_literal: true

module DesignSystem
  class Footer < ::Base
    set_url "/iframe.html?id=3-components--footer&viewMode=story"

    sections :category_titles, ".cads-grid-col-md-3 > h2" do
      elements :links, :xpath, "./following-sibling::ul[1]/li/a"
    end

    section :initial_form, ".cads-footer" do
      element :website_feedback, ".cads-website-feedback a"
      element :logo, ".cads-logo"
      element :copyright, ".cads-footer__company-info div p:nth-of-type(1)"
      element :company_info, ".cads-footer__company-info div p:nth-of-type(2)"
    end
  end
end
