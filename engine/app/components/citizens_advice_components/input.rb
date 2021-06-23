# frozen_string_literal: true

module CitizensAdviceComponents
  class Input < Base
    attr_reader :name, :label, :error_message, :hint, :width, :value

    def initialize(name:, label:, type:, options: nil)
      super
      @name = name
      @label = label
      @type = type

      set_options(options)
    end

    def set_options(options)
      return unless options.present?

      @error_message = options.dig(:error_message)
      @hint = options.dig(:hint)
      @optional = fetch_or_fallback_boolean(options.dig(:optional), fallback: false)
      @width = fetch_or_fallback(
        allowed_values: allowed_width_values,
        given_value: options.dig(:width),
        fallback: nil
      )
      @value = options.dig(:value)
      @additional_attributes = options.dig(:additional_attributes)
    end

    def allowed_width_values
      %w[2ch 4ch 8ch 16ch] << nil
    end

    def optional?
      @optional
    end

    def required?
      !@optional
    end

    def error?
      @error_message.present?
    end

    def hint?
      @hint.present?
    end

    def width?
      @width.present?
    end

    def label_id
      "#{name}-label"
    end

    def input_id
      "#{name}-input"
    end

    def error_id
      "#{name}-error"
    end

    def base_input_attributes
      {
        type: @type,
        id: input_id,
        name: name,
        value: value,
        required: required?,
        "aria-invalid": error?,
        class: ("cads-input--#{width}" if width?),
        "aria-describedby": (error_id.to_s if error?)
      }
    end

    def input_attributes
      if @additional_attributes.present?
        base_input_attributes.merge @additional_attributes
      else
        base_input_attributes
      end
    end
  end
end
