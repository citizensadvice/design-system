# frozen_string_literal: true

module Search
  class Standard < ::Base
    set_url "/iframe.html?id=components-search--search&viewMode=story"

    element :search_form, ".cads-search"
    element :search_field, ".cads-search__input"
    element :search_button, ".cads-search__button"

    def validate_initial_state!
      has_search_form?(wait: 5)
    end

    def clear_field
      search_field.value.length.times do
        search_field.send_keys [:backspace]
      end
    end
  end
end
