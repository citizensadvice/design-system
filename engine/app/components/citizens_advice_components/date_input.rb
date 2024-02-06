# frozen_string_literal: true

module CitizensAdviceComponents
  class DateInput < Input
    renders_many :date_fields, "DateField"
    attr_reader :name, :label, :errors, :values

    def initialize(values: nil, errors: nil, **args)
      super(**args.merge({ type: :text }))
      @values = values
      @errors = errors
    end

    def render?
      date_fields.present?
    end

    def input_attributes(date_field)
      {
        class: input_classes(date_field),
        name: date_field.name,
        id: input_id(date_field),
        inputmode: "numeric",
        value: date_field.value,
        "data-testid": "#{date_field.timespan}-input"
      }
    end

    def label_attributes(date_field)
      {
        class: "cads-form-field__label",
        id: "#{input_id(date_field)}-label",
        for: input_id(date_field)
      }
    end

    private

    def input_id(date_field)
      date_field.id
    end

    def input_classes(date_field)
      "cads-input #{width_class(date_field.timespan)} #{error_class(date_field)}"
    end

    def error_class(date_field)
      "cads-input--error" if timespan_error?(date_field.timespan)
    end

    def timespan_error?(timespan)
      return false if errors.blank?

      errors.any? { |e| e == timespan }
    end

    def width_class(timespan)
      case timespan
      when :year
        "cads-input--4ch"
      else
        "cads-input--2ch"
      end
    end

    class DateField
      attr_reader :name, :id, :timespan, :value

      def initialize(name:, id:, timespan:, value: nil)
        @name = name
        @id = id
        @timespan = timespan
        @value = value
      end
    end
  end
end
