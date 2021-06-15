# frozen_string_literal: true

module Callouts
  class Nested < ::Base
    set_url "/iframe.html?id=components-callouts--nested&viewMode=story"

    section :outer_standard, ".cads-callout--standard" do
      element :heading, "h3"
      element :message, "p"

      section :inner_adviser, ".cads-callout--adviser" do
        element :label, ".cads-badge"
        element :heading, "h3"
        element :message, "p"
      end
    end
  end
end
