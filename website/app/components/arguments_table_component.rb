# frozen_string_literal: true

class ArgumentsTableComponent < ViewComponent::Base
  def initialize(component_name)
    @component_name = component_name
  end

  def call
    render CitizensAdviceComponents::Table.new(
      caption: "Component arguments",
      header: %w[Argument Description],
      rows: component_arguments.map do |item|
        [
          tag.code(item[:argument]),
          item[:description].html_safe # rubocop:disable Rails/OutputSafety
        ]
      end
    )
  end

  def render?
    component_arguments.any?
  end

  private

  attr_reader :component_name

  def component_arguments
    data[component_name].to_a
  end

  def data
    @data ||= begin
      config = YAML.load_file(Rails.root.join("config/data/component_arguments.yml").to_s)
      config.deep_symbolize_keys
    end
  end
end
