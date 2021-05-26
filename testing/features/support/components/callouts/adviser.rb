# frozen_string_literal: true

module Callouts
  class Adviser < Standard
    set_url "/iframe.html?id=components-callouts--adviser&viewMode=story"

    def warning
      before_content(".cads-badge--adviser").delete('\\"')
    end
  end
end
