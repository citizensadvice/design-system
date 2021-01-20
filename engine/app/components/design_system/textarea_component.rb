# frozen_string_literal: true

module DesignSystem
  class TextareaComponent < BaseInputComponent
    include ActiveModel::Validations

    attr_reader :rows

    validates(
      :rows,
      inclusion: { in: 4..20, message: "must be between 4 and 20" }
    )

    def initialize(
      rows:,
      **base_input_args
    )
      super(base_input_args)
      @base_input_args = base_input_args
      @rows = rows
    end

    def textarea_attributes
      {
        id: "#{name}-input",
        name: name,
        value: value,
        rows: rows
      }
    end

    def before_render
      validate!
    end
  end
end
