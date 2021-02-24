# frozen_string_literal: true

module Navigation
  class Standard < ::Base
    set_url "/iframe.html?id=components-navigation--default-story&viewMode=story"

    element :more_button, "button", { text: "More", wait: 2 }
    element :close_button, "button", text: "Close"
    element :last_link, "a", text: "More from us"
    element :sign_out, "button", text: "Sign out"

    def open_dropdown_menu
      more_button.click(wait: 2)
    end

    def close_dropdown_menu
      close_button.click(wait: 2)
    end
  end
end



