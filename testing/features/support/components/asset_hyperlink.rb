# frozen_string_literal: true

module DesignSystem
  class AssetHyperlink < ::Base
    set_url "/iframe.html?id=3-components--asset-hyperlink&viewMode=story"

    section :initial_form, "#a11yComponentToTest" do
      include Helpers::Scripts

      element :download_link, "a"
      element :download_size, ".cads-asset-type"

      def download_icon_content
        evaluate_script(before_content(".cads-icon_file")).delete('\\"')
      end
    end
  end
end
