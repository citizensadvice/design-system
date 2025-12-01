# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class DateField < Base
      include Traits::FieldGroup

      def initialize(builder, template, object, attribute, options)
        super(builder, template, object)

        @attribute = attribute
        @options = options
      end

      private

      def render_field_group
        tag.div(class: "cads-date-input") do
          safe_join([render_day_input, render_month_input, render_year_input])
        end
      end

      def render_date_input(&block)
        tag.div(class: "cads-date-input") do
          tag.div(class: "cads-date-input__item", &block)
        end
      end

      def render_day_input
        render_date_input do
          tag.label(class: "cads-form-field__label", for: "#{builder.field_id(attribute)}-input") do
            I18n.t("citizens_advice_components.date_input.day")
          end +
            tag.input(
              class: class_names("cads-input", "cads-input--2ch", "cads-input--error": error?),
              name: date_field_name("3i"),
              id: "#{builder.field_id(attribute)}-input",
              inputmode: "numeric",
              value: day_value
            )
        end
      end

      def render_month_input
        render_date_input do
          tag.label(class: "cads-form-field__label", for: date_field_id("2i")) do
            I18n.t("citizens_advice_components.date_input.month")
          end +
            tag.input(
              class: class_names("cads-input", "cads-input--2ch", "cads-input--error": error?),
              name: date_field_name("2i"),
              id: date_field_id("2i"),
              inputmode: "numeric",
              value: month_value
            )
        end
      end

      def render_year_input
        render_date_input do
          tag.label(class: "cads-form-field__label", for: date_field_id("1i")) do
            I18n.t("citizens_advice_components.date_input.year")
          end +
            tag.input(
              class: class_names("cads-input", "cads-input--4ch", "cads-input--error": error?),
              name: date_field_name("1i"),
              id: date_field_id("1i"),
              inputmode: "numeric",
              value: year_value
            )
        end
      end

      def date_field_name(suffix)
        builder.field_name("#{attribute}(#{suffix})")
      end

      def date_field_id(suffix)
        "#{builder.field_id(attribute)}_#{suffix}"
      end

      def day_value
        current_value.day if current_value.is_a?(Date)
      end

      def month_value
        current_value.month if current_value.is_a?(Date)
      end

      def year_value
        current_value.year if current_value.is_a?(Date)
      end

      def current_value
        object.send(attribute)
      end

      def page_heading
        options[:page_heading]
      end

      def hint
        options[:hint]
      end
    end
  end
end
