# frozen_string_literal: true

module Navigation
  class WithHeader < ::Base
    set_url "/iframe.html?id=sample-pages-advice-collection--advice-collection-public&viewMode=story"

    element :navigation, ".js-cads-greedy-nav"
  end
end
