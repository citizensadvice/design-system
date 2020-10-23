# frozen_string_literal: true

module Header
  class LoggedOut < ::Base
    set_url "/iframe.html?id=3-components--header&viewMode=story"

    element :change_language, ".cads-header-account-panel li:nth-of-type(1)"
    element :login, ".cads-header-account-panel li:nth-of-type(2)"
    element :logo, ".cads-logo"
    element :search_field, "[type='search']"
    element :search_button, "[title='Submit search query']"

    def validate_initial_state!
      has_change_language?(wait: 5)
    end
  end
end
