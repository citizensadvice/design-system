# frozen_string_literal: true

module CitizensAdviceComponents
  class Input < Base

    attr_reader :name, :label, :error_message, :hint, :width, :value

    def initialize(name:, label:, type: "text", error_message: nil, hint: nil, optional: false, width: nil, value: nil, additional_attrs: nil)
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
      @additional_attrs = additional_attrs
    end

    def allowed_width_values
      %i[2ch 4ch 8ch 16ch] << nil
    end

    def optional?
      @optional
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

    def base_input_attrs
      {
        type: @type,
        id: input_id, 
        name: name,
        value: value,
        class: ("cads-input--#{width}" if has_width?)
      }
    end

    def input_attrs
      if @additional_attrs.present?
        base_input_attrs.merge @additional_attrs
      else
        base_input_attrs
      end
    end
  end
end
