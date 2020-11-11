# frozen_string_literal: true

module Header
  class Standard < ::Base
    set_url "/iframe.html?id=components-header--default&viewMode=story"

    element :change_language, "a", text: "Cymraeg"
    element :login, "[data-testid='account-link']"
    element :logo, ".cads-logo"
    element :search_field, "[type='search']"
    element :search_button, "[title='Submit search query']"

    def validate_initial_state!
      has_change_language?(wait: 5)
    end
  end
end
