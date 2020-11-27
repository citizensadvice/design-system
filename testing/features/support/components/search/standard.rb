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
  end
end
