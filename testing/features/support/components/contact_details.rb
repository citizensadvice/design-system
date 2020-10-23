# frozen_string_literal: true

module DesignSystem
  class ContactDetails < ::Base
    set_url "/iframe.html?id=3-components--contact-details&viewMode=story"

    section :initial_form, ".cads-contact-details" do
      elements :paragraphs, "p"
      element :first_bold_paragraph, "p:nth-of-type(1) strong"
    end
  end
end
