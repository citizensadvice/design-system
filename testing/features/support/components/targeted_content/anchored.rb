# frozen_string_literal: true

module TargetedContent
  class Anchored < Default
    set_url "/iframe.html?id=components-targeted-content--with-anchor&viewMode=story"

    element :jump_to_targeted_content, "a[href^='#']"
  end
end
