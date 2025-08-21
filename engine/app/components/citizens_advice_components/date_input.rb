# frozen_string_literal: true

module CitizensAdviceComponents
  class DateInput < Base
    attr_reader(
      :name,
      :label,
      :values,
      :errors,
      :error_message,
      :hint
    )

    def initialize(name:, label:, values: nil, errors: nil, options: nil)
      @name = name
      @label = label
      @values = values
      @errors = errors

      return if options.blank?

      @error_message = options[:error_message]
      @hint = options[:hint]
      @optional = fetch_or_fallback_boolean(options[:optional], fallback: false)
      @page_heading = fetch_or_fallback_boolean(options[:page_heading], fallback: false)
    end

    private

    def optional?
      @optional
    end

    def error?
      @error_message.present?
    end

    def hint?
      @hint.present?
    end

    def page_heading?
      @page_heading
    end

    def input_attributes(timespan)
      {
        type: "text",
        class: input_classes(timespan),
        name: input_id(timespan),
        id: input_id(timespan),
        inputmode: "numeric",
        value: value_for(timespan),
        "aria-invalid": timespan_error?(timespan),
        "data-testid": "#{timespan}-input"
      }
    end

    def label_attributes(timespan)
      {
        class: "cads-form-field__label",
        id: "#{input_id(timespan)}-label",
        for: input_id(timespan)
      }
    end

    def value_for(timespan)
      return if values.blank?

      values[timespan].presence
    end

    def input_id(timespan)
      "#{name}-#{timespan}"
    end

    def input_classes(timespan)
      "cads-input #{width_class(timespan)} #{error_class(timespan)}"
    end

    def error_class(timespan)
      "cads-input--error" if timespan_error?(timespan)
    end

    def timespan_error?(timespan)
      return false if errors.blank?

      errors.any?(timespan)
    end

    def width_class(timespan)
      case timespan
      when :year
        "cads-input--4ch"
      else
        "cads-input--2ch"
      end
    end
  end
end
