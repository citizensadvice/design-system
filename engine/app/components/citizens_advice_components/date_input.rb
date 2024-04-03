# frozen_string_literal: true

module CitizensAdviceComponents
  class DateInput < Input
    attr_reader :name, :label, :errors, :values

    def initialize(values: nil, errors: nil, **args)
      super(**args.merge({ type: :text }))
      @values = values
      @errors = errors
    end

    def input_attributes(timespan)
      {
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

    private

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
