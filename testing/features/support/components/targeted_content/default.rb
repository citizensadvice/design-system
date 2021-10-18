# frozen_string_literal: true

module TargetedContent
  class Default < ::Base
    set_url "/iframe.html?id=components-targeted-content--default&viewMode=story"

    section :heading, "h2[id*='targeted-content']" do
      element :expand_collapse, "button"
    end

    section :additional_information, "[id$='content']" do
      element :close, "button"
    end
  end
end
