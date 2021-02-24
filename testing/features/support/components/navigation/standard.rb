# frozen_string_literal: true

module Navigation
  class Standard < ::Base
    set_url "/iframe.html?id=components-navigation--default-story&viewMode=story"

    element :more_button, "button", { text: "More", wait: 2 }
    element :close_button, "button", text: "Close"
    element :last_link, "a", text: "More from us"

    def open_dropdown_menu
      more_button.click(wait: 2)
    end

    def close_dropdown_menu
      close_button.click(wait: 2)
    end

    def tab_into_dropdown
      5.times do
        send_keys(:tab)
      end
    end

    def tab_through_dropdown
      10.times do
        send_keys(:tab)
      end
    end

    def click_outside
      nav = find(".js-cads-greedy-nav")
      nav.click(x: 0, y: 400)
    end
  end
end
