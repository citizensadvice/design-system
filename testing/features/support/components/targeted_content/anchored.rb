# frozen_string_literal: true

module TargetedContent
  class Anchored < Default
    set_url "/rails/view_components/citizens_advice_components/targeted_content/anchor"

    element :jump_to_targeted_content, "a[href^='#']"
  end
end
