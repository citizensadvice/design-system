# frozen_string_literal: true

module Header
  class Standard < ::Base
    set_url "/iframe.html?id=components-header--default&viewMode=story"

    include Helpers::Page

    element :change_language, "a", text: "Cymraeg"
    element :login, "[data-testid='account-link']"
    element :logo, ".cads-logo"
    element :search_field, "[type='search']"
    element :search_button, "[title='Submit search query']"
    element :open_search_pane, "[title='Open search']"
    element :skip_link_text, ".cads-skip-links__link", visible: false

    def tab_to(desired_area)
      tab_quantity_for_skip_link(desired_area).times do
        # This next line is a hack until capybara cut a new version containing
        # https://github.com/teamcapybara/capybara/pull/2422
        # ETA Early December based on previous releases
        #
        # LH - Nov 2020
        fake_active_element = page.find('body')
        fake_active_element.send_keys(:tab)
        sleep 0.5
      end
    end

    def active_skip_link_text
      evaluate_script("document.activeElement").text
    end
  end
end
