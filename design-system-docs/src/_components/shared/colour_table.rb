# frozen_string_literal: true

module Shared
  class ColourTable < ViewComponent::Base
    Bridgetown::ViewComponentHelpers.allow_rails_helpers :tag

    include Bridgetown::ViewComponentHelpers

    def initialize(colour_mappings)
      super

      @colour_mappings = colour_mappings
      @site = Bridgetown::Current.site
    end

    def call
      render CitizensAdviceComponents::Table.new(
        header: [
          "Colour",
          "Variable",
          "Hex code"
        ],
        rows:
      )
    end

    def rows
      @colour_mappings.map do |(description, colour_key)|
        colour = colour_for(colour_key)

        [
          tag.div do
            swatch_for(colour["compiledValue"]) + description
          end,
          tag.code("$cads-language__#{colour_key}"),
          tag.code(colour["compiledValue"])
        ]
      end
    end

    def swatch_for(colour_value)
      tag.span(class: "colour-swatch", style: "background-color: #{colour_value}")
    end

    def colour_for(colour_key)
      @site.data.colour_language.variables.find do |variable|
        variable.name.include?(colour_key)
      end
    end
  end
end
