# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class DateInput < Base
      include ActionView::Helpers::TagHelper

      def render
        tag.div(class: form_field_classes) do
          safe_join([
            error_marker,
            render_fieldset
          ])
        end
      end

      private

      def render_fieldset
        tag.fieldset(
          class: "cads-form-group",
          "aria-describedby": fieldset_described_by
        ) do
          safe_join([
            legend_html,
            hint_html,
            error_message_html,
            date_inputs
          ])
        end
      end

      def fieldset_described_by
        ids = []
        ids << error_id if error?
        ids << hint_id if hint.present?
        ids.present? ? ids.join(" ") : nil
      end

      def legend_html
        tag.legend(class: "cads-form-field__label") do
          if options[:page_heading].present?
            tag.h1(class: "cads-page-title") { label }
          else
            safe_join([label, " ", optional_html])
          end
        end
      end

      def hint_html
        return if hint.nil?

        tag.p(class: "cads-form-field__hint", id: hint_id) { hint }
      end

      def error_message_html
        return unless error?

        tag.p(class: "cads-form-field__error-message", id: error_id) { error_message }
      end

      def optional_html
        return unless optional

        tag.span(class: "cads-form-field__optional") do
          "(#{I18n.t('citizens_advice_components.input.optional')})"
        end
      end

      def date_inputs
        tag.div(class: "cads-date-input") do
          safe_join([day_input, month_input, year_input])
        end
      end

      def day_input
        tag.div(class: "cads-date-input") do
          tag.div(class: "cads-date-input__item") do
            tag.label(class: "cads-form-field__label", for: "#{field_id}-input") do
              I18n.t("citizens_advice_components.date_input.day")
            end +
              tag.input(
                class: class_names("cads-input", "cads-input--2ch", "cads-input--error": error?),
                name: date_field_name("3i"),
                id: "#{field_id}-input",
                inputmode: "numeric",
                value: day_value
              )
          end
        end
      end

      def month_input
        tag.div(class: "cads-date-input") do
          tag.div(class: "cads-date-input__item") do
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
      end

      def year_input
        tag.div(class: "cads-date-input") do
          tag.div(class: "cads-date-input__item") do
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
      end

      def date_field_name(suffix)
        @template.field_name(object_name, "#{attribute}(#{suffix})")
      end

      def date_field_id(suffix)
        "#{field_id}_#{suffix}"
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

      def hint_id
        "#{field_id}-hint"
      end

      def error_id
        "#{field_id}-error"
      end

      def field_id
        template.field_id(object_name, attribute)
      end
    end
  end
end
