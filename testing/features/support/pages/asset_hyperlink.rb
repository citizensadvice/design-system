# frozen_string_literal: true

module DesignSystem
  class AssetHyperlink < SitePrism::Page
    set_url "/iframe.html?id=3-components--asset-hyperlink&viewMode=story"

    element :page_title, "h1"
    section :initial_form, "#a11yComponentToTest" do
      element :download_link, "a"
      element :download_size, ".cads-asset-type"

      def download_icon_content
        Capybara.current_session.evaluate_script(
          "window.getComputedStyle(
            document.querySelector('.cads-icon_file'), '::before'
          ).getPropertyValue('content')"
        ).delete('\\"')
      end
    end

    load_validation do
      AutomationLogger.debug("Waiting for Asset Hyperlink component.")
      [has_initial_form?(wait: 5), "Initial Asset Hyperlink component didn't load correctly!"]
    end
  end
end
