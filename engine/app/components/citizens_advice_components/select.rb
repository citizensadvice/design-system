# frozen_string_literal: true

module CitizensAdviceComponents
  class Select < CitizensAdviceComponents::Input
    attr_reader :base_input_args, :select_options, :value

    def initialize(select_options:, **args)
      @select_options = select_options
      @base_input_args = args.merge(type: nil)
      super(**@base_input_args)
    end

    def call
      render CitizensAdviceComponents::Input.new(**base_input_args) do
        tag.select(class: select_classes, **input_attributes) do
          tag
          options_for_select(select_options, value)
        end
      end
    end

    private

    def select_classes
      %w[
        cads-select
        cads-input
      ]
    end

    def base_input_attributes
      # selects do not control their current value with the `value` attribute
      super.reject { |k| k == :value }
    end
  end
end
