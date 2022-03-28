# frozen_string_literal: true

module Header
  class Standard < ::Base
    set_url "/iframe.html?id=components-header--default&viewMode=story"

    element :change_language, "a", text: "Cymraeg"
    element :login, "[data-testid='account-link']"
    element :logo, ".cads-logo"
    element :search_field, "[type='search']"
    element :search_button, "[data-testid='search-button']"
    element :open_search_pane, "[data-testid='expand-button']"

    def search_for(search_term)
      search_field.send_keys(search_term)
    end
  end
end
