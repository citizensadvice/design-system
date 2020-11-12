# frozen_string_literal: true

module Callout
  class Adviser < Standard
    set_url "/iframe.html?id=components-callouts--adviser-callout&viewMode=story"

    def warning
      before_content(".cads-callout__adviser-label").delete('\\"')
    end
  end
end
