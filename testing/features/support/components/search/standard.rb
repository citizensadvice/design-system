# frozen_string_literal: true

module Search
  class Standard < ::Base
    include Helpers::EnvVariables

    set_url "/iframe.html?id=components-search--search&viewMode=story"

    element :search_field, ".cads-search__input"
    element :search_button, ".cads-search__button"

    def search_for(term)
      clear_field

      search_field.send_keys(term)
    end

    private

    def clear_field
      search_field.send_keys(%i[end])
      search_field.send_keys(%i[shift home])
      search_field.send_keys(:delete)
    end

    def current_text_length
      search_field.value.length
    end
  end
end
