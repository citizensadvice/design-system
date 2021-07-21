# frozen_string_literal: true

module Navigation
  class Default < ::Base
    include Helpers::BrowserWindow

    set_url "/iframe.html?id=components-navigation--default&viewMode=story"

    element :navigation, ".js-cads-greedy-nav"
    element :more_button, "button", { text: "More", wait: 2 }
    element :close_button, "button", { text: "Close", wait: 2 }
    element :last_link, "a", text: "More from us"

    def tab_into_dropdown
      send_tabs(5)
    end

    def tab_through_dropdown
      send_tabs(10)
    end

    def click_outside_navigation
      navigation.click(x: 0, y: 400)
    end
  end
end
