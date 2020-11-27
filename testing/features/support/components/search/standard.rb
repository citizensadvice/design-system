# frozen_string_literal: true

module Search
  class Standard < ::Base
    set_url "/iframe.html?id=components-search--search&viewMode=story"

    section :cads_search, ".cads-search" do
      element :search_field, ".cads-search__input"
      element :search_button, ".cads-search__button"
    end

    def validate_initial_state!
      has_cads_search?(wait: 5)
    end

    def clear_field
      cads_search.search_field.value.length.times do
        cads_search.search_field.send_keys [:backspace]
      end
    end
  end
end
