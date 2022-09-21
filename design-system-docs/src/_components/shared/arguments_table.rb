# frozen_string_literal: true

module Shared
  class ArgumentsTable < ViewComponent::Base
    Bridgetown::ViewComponentHelpers.allow_rails_helpers :tag

    include Bridgetown::ViewComponentHelpers

    def initialize(component_name)
      super

      @component_name = component_name
      @site = Bridgetown::Current.site
    end

    def call
      render CitizensAdviceComponents::Table.new(
        header: %w[Argument Description],
        rows: data.map do |item|
          [tag.code(item[:argument]), item[:description].html_safe]
        end
      )
    end

    def render?
      data.any?
    end

    def data
      # Maps to keys in _data/component_arguments.yml
      @site.data.component_arguments[@component_name].to_a
    end
  end
end
