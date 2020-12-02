# frozen_string_literal: true

module Search
  class Standard < ::Base
    set_url "/iframe.html?id=components-search--search&viewMode=story"

    element :search_field, ".cads-search__input"
    element :search_button, ".cads-search__button"

    def search_for(term)
      search_field.send_keys(:end)
      search_field.send_keys([:shift, :home])
      search_field.send_keys(:delete)

      search_field.send_keys(term)
    end
  end
end
