# frozen_string_literal: true

class ColourTableComponent < ViewComponent::Base
  def initialize(colour_mappings)
    @colour_mappings = colour_mappings
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

  private

  def rows
    @colour_mappings.map do |(description, colour_key)|
      colour = colour_for(colour_key)

      [
        tag.div do
          swatch_for(colour[:compiledValue]) + description
        end,
        tag.code("$cads-language__#{colour_key}"),
        tag.code(colour[:compiledValue])
      ]
    end
  end

  def swatch_for(colour_value)
    tag.span(class: "colour-swatch", style: "background-color: #{colour_value}")
  end

  def colour_for(colour_key)
    data[:variables].find do |variable|
      variable[:name].include?(colour_key)
    end
  end

  def data
    @data ||= begin
      config = JSON.load_file(Rails.root.join("config/data/colour_language.json").to_s)
      config.deep_symbolize_keys
    end
  end
end
