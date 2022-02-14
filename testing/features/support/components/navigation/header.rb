# frozen_string_literal: true

module Navigation
  class Header < Default
    set_url "/iframe.html?id=sample-pages-examples--content-page&args=&viewMode=story"

    element :sign_in, "a", text: "Sign in"
  end
end
