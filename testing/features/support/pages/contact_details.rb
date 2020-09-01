# frozen_string_literal: true

module DesignSystem
  class ContactDetails < SitePrism::Page
    set_url "/iframe.html?id=3-components--contact-details&viewMode=story"

    element :page_title, "h1"

    section :initial_form, ".cads-contact-details" do
      elements :paragraphs, "p"
      element :first_bold_paragraph, "p:nth-of-type(1) strong"
    end

    load_validation do
      AutomationLogger.debug("Waiting for Contact Details component.")
      [has_initial_form?(wait: 5), "Initial Contact Details component didn't load correctly!"]
    end
  end
end
