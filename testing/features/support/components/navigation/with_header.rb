# frozen_string_literal: true
# frozen_string_literal: true


module Navigation  
  class WithHeader < Standard
    set_url "/iframe.html?id=sample-pages-advice-collection--advice-collection-public&viewMode=story"

    element :sign_out, "button", text: "Sign out"
  end
end