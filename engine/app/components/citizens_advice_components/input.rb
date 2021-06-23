# frozen_string_literal: true

module CitizensAdviceComponents
  class Input < Base

    attr_reader :name, :label, :error_message, :hint, :width, :value

    def initialize(name:, label:, type:, error_message: nil, hint: nil, optional: false, width: nil, value: nil, additional_attributes: nil)
      super
      @name = name
      @label = label
      @type = type
      @error_message = error_message
      @hint = hint
      @optional = fetch_or_fallback_boolean(optional, fallback: false)
      @width = fetch_or_fallback(
        allowed_values: allowed_width_values,
        given_value: width,
        fallback: nil
      )
      @value = value
      @additional_attributes = additional_attributes
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

    def has_error?
      @error_message.present?
    end

    def has_hint?
      @hint.present?
    end

    def has_width?
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
        "aria-invalid": has_error?,
        class: ("cads-input--#{width}" if has_width?),
        "aria-describedby": ("#{error_id}" if has_error?)
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
