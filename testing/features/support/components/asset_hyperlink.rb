# frozen_string_literal: true

module DesignSystem
  class AssetHyperlink < ::Base
    set_url "/iframe.html?id=3-components--asset-hyperlink&viewMode=story"

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
  end
end
