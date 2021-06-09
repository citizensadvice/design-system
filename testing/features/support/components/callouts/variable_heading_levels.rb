# frozen_string_literal: true

module Callouts
  class VariableHeadingLevels < Nested
    set_url "/iframe.html?id=components-callouts--variable-heading&viewMode=story"

    section :outer_standard, ".cads-callout--standard" do
      section :inner_adviser, ".cads-callout--adviser" do
        elements :h2, "h2"
        elements :h3, "h3"
        elements :h4, "h4"
        elements :message, "p"

        expected_elements :label, :message
      end
    end
  end
end
