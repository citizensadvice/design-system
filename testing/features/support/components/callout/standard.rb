# frozen_string_literal: true

module Callout
  class Standard < ::Base
    include Helpers::Scripts

    set_url "/iframe.html?id=components-callouts--standard-callout&viewMode=story"

    element :heading, "h3"
    element :message, "p"

    def warning
      evaluate_script(before_content("h3")).delete('\\"')
    end

    def validate_initial_state!
      has_heading?(wait: 5)
    end
  end
end
