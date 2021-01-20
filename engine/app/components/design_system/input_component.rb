# frozen_string_literal: true

module DesignSystem
  class InputComponent < BaseInputComponent
    include ActiveModel::Validations

    attr_reader :size

    VALID_SIZES = %w[2ch 4ch 8ch 16ch].freeze

    validates(
      :size,
      inclusion: {
        in: VALID_SIZES,
        message: "%{value} must be one of #{VALID_SIZES.join(', ')}"
      },
      allow_nil: true
    )

    def initialize(
      size: nil,
      **base_input_args
    )
      super(base_input_args)
      @base_input_args = base_input_args
      @size = size
    end

    def input_attributes
      {
        type: "text",
        id: "#{name}-input",
        name: name,
        value: value,
        class: ("cads-input--#{size}" if size)
      }
    end

    def before_render
      validate!
    end
  end
end
