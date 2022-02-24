# frozen_string_literal: true

module AssetHyperlink
  class Example < ::Base
    set_url "/iframe.html?id=components-asset-hyperlink--example&viewMode=story"

    element :download_link, "a"
    element :download_size, ".cads-asset-type"

    def validate_initial_state!
      has_download_link?(wait: 5)
    end
  end
end
