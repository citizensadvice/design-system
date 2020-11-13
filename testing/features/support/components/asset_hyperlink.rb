# frozen_string_literal: true

module DesignSystem
  class AssetHyperlink < ::Base
    set_url "/iframe.html?id=components-asset-hyperlink--example&viewMode=story"

    section :initial_form, "#a11yComponentToTest" do
      include Helpers::Javascript

      element :download_link, "a"
      element :download_size, ".cads-asset-type"

      def download_icon_content
        before_content(".cads-icon_file").delete('\\"')
      end
    end

    def validate_initial_state!
      has_initial_form?(wait: 5)
    end
  end
end
