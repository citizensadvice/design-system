# frozen_string_literal: true

module Search
  class Standard < ::Base
    set_url "/iframe.html?id=components-search--search&viewMode=story"

    element :search_field, ".cads-search__input cads-input"
    element :button, ".cads-search__button"

    def validate_initial_state!
      has_search_field?(wait: 5)
    end
  end
end
