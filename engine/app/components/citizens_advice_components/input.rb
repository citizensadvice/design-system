# frozen_string_literal: true

module CitizensAdviceComponents
  class Input < Base
    attr_reader :name, :label, :error_message, :hint, :value

    def initialize(name:, label:, type:, options: nil)
      super
      @name = name
      @label = label
      @type = fetch_or_fallback(
        allowed_values: allowed_type_values,
        given_value: type.to_sym,
        fallback: :text
      )

      set_options(options)
    end

    def set_options(options)
      return unless options.present?

      @error_message = options[:error_message]
      @hint = options[:hint]
      @optional = fetch_or_fallback_boolean(options[:optional], fallback: false)

      @value = options[:value]
      @additional_attributes = options[:additional_attributes]
    end

    def allowed_type_values
      %i[
        color
        date
        datetime_local
        email
        file
        hidden
        image
        month
        number
        password
        search
        tel
        text
        time
        url
        week
      ]
    end

    def optional?
      @optional
    end

    def required?
      !optional?
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

    def width_class
      return unless width?

      "cads-input--#{width.to_s.dasherize}"
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
        type: @type.to_s.dasherize,
        id: input_id,
        name: name,
        value: value,
        required: required?,
        "aria-invalid": error?,
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
