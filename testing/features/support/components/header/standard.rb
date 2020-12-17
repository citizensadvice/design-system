# frozen_string_literal: true

module Header
  class Standard < ::Base
    set_url "/iframe.html?id=components-header--default&viewMode=story"

    include Helpers::Page
    include Helpers::Javascript

    element :change_language, "a", text: "Cymraeg"
    element :login, "[data-testid='account-link']"
    element :logo, ".cads-logo"
    element :search_field, "[type='search']"
    element :search_button, "form > button"
    element :open_search_pane, "[title='Open search']"

    def tab_to(desired_area)
      tab_quantity_for_skip_link(desired_area).times do
        # This next line is a hack until capybara cut a new version containing
        # https://github.com/teamcapybara/capybara/pull/2422
        # ETA Early December based on previous releases
        #
        # LH - Nov 2020
        fake_active_element = page.find("body")
        if safari?
          fake_active_element.send_keys([:alt, :tab])
          # This next line is ANOTHER hack that is needed because Safari is crap
          # and broken. The modifier key here (OPTION, but called :alt), is not
          # "un-depressed" after being used in the alt+tab call. This means that
          # subsequent calls do things like alt+click which downloads a link!
          #
          # See: https://bugs.webkit.org/show_bug.cgi?id=219948
          # LH - Dec 2020
          fake_active_element.send_keys(:alt)
        else
          fake_active_element.send_keys(:tab)
        end
        sleep 0.1
      end
    end
  end
end
