# frozen_string_literal: true

module Foundations
  class SpacingTable < ViewComponent::Base
    def call
      render(
        CitizensAdviceComponents::Table.new(
          header: %w[Variables Example Size],
          rows: %w[4px 8px 12px 16px 24px 32px 40px].each_with_index.map do |size, index|
            [
              "$cads-spacing-#{index + 1}",
              tag.div(class: "spacing-block-#{index + 1}"),
              size
            ]
          end
        )
      )
    end
  end
end
