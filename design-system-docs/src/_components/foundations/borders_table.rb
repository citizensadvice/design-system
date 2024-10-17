# frozen_string_literal: true

module Foundations
  class BordersTable < ViewComponent::Base
    def call
      render(
        CitizensAdviceComponents::Table.new(
          header: %w[Variables Example Size],
          rows: [
            [
              "$cads-border-width-small",
              tag.div(class: "sizing-border"),
              "1px"
            ],
            [
              "$cads-border-width-medium",
              tag.div(class: "sizing-border sizing-border--medium"),
              "2px"
            ],
            [
              "$cads-border-width-large",
              tag.div(class: "sizing-border sizing-border--large"),
              "4px"
            ]
          ]
        )
      )
    end
  end
end
