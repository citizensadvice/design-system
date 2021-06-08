# frozen_string_literal: true

module TargetedContent
  class Adviser < Default
    set_url "/iframe.html?id=components-targeted-content--with-adviser&viewMode=story"

    def adviser_badge
      before_content(".cads-badge--adviser").delete('\\"')
    end
  end
end
