# frozen_string_literal: true

module Navigation
  class Header < Standard
    set_url "/iframe.html?id=sample-pages-advice-collection--advice-collection-public&viewMode=story"

    element :sign_out, "button", text: "Sign out"
  end
end
