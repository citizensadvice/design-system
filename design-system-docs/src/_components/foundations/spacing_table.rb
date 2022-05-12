# frozen_string_literal: true

module Foundations
  class SpacingTable < ViewComponent::Base
    include Bridgetown::ViewComponentHelpers

    def call
      render(
        CitizensAdviceComponents::Table.new(
          header: %w[Variables Example Size],
          rows: [
            [
              "$cads-spacing-1",
              "<div class='spacing-block-1' />",
              "4px"
            ],
            [
              "$cads-spacing-2",
              "<div class='spacing-block-2' />",
              "8px"
            ],
            [
              "$cads-spacing-3",
              "<div class='spacing-block-3' />",
              "12px"
            ],
            [
              "$cads-spacing-4",
              "<div class='spacing-block-4' />",
              "16px"
            ],
            [
              "$cads-spacing-5",
              "<div class='spacing-block-5' />",
              "24px"
            ],
            [
              "$cads-spacing-6",
              "<div class='spacing-block-6' />",
              "32px"
            ],
            [
              "$cads-spacing-7",
              "<div class='spacing-block-7' />",
              "40px"
            ],
          ])
      )
    end
  end
end
