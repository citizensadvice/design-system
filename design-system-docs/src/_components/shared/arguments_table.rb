# frozen_string_literal: true

module Shared
  class ArgumentsTable < ViewComponent::Base
    Bridgetown::ViewComponentHelpers.allow_rails_helpers :tag

    include Bridgetown::ViewComponentHelpers

    def initialize(component_arguments)
      super

      @component_arguments = component_arguments
    end

    def rows
      @component_arguments.map do |item|
        [tag.code(item[:argument]), item[:description]]
      end
    end

    def header
      %w[Argument Description]
    end
  end
end
