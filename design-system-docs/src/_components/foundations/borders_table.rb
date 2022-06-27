# frozen_string_literal: true

module Foundations
  class BordersTable < ViewComponent::Base
    include Bridgetown::ViewComponentHelpers

    def call
      render(
        CitizensAdviceComponents::Table.new(
          header: %w[Variables Example Size],
          rows: [
            [
              "$cads-border-width-small",
              "<div class='sizing-border' />",
              "1px"
            ],
            [
              "$cads-border-width-medium",
              "<div class='sizing-border sizing-border--medium' />",
              "2px"
            ],
            [
              "$cads-border-width-large",
              "<div class='sizing-border sizing-border--large' />",
              "4px"
            ],
          ])
      )
    end
  end
end
