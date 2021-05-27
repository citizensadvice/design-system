# frozen_string_literal: true

module AssetHyperlink
  class Example < ::Base
    include Helpers::Javascript

    set_url "/iframe.html?id=components-asset-hyperlink--example&viewMode=story"

    element :download_link, "a"
    element :download_size, ".cads-asset-type"

    def download_icon_content
      before_content(".cads-icon_file").delete('\\"')
    end

    def validate_initial_state!
      has_download_link?(wait: 5)
    end
  end
end
