# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class ErrorSummary < Base
      attr_reader :builder, :template, :object
      attr_accessor :options

      def initialize(builder, template, object, options)
        super(builder, template, object)

        @options = options.with_defaults({ heading_level: 2 })
      end

      def render
        return unless object.errors.any?

        tag.div(
          class: "cads-error-summary js-error-summary",
          "data-testid": "error-summary",
          "aria-labelledby": "error-summary-title",
          "aria-live": "assertive",
          role: "alert",
          tabindex: "0",
          autofocus: autofocus?
        ) do
          render_heading + render_error_messages
        end
      end

      private

      def render_heading
        content_tag(
          :"h#{heading_level}",
          id: "error-summary-title",
          class: "cads-error-summary__title"
        ) do
          I18n.t("citizens_advice_components.error_summary.title")
        end
      end

      def render_error_messages
        tag.ul(class: "cads-error-summary__list") do
          items = object.errors.group_by_attribute.map do |attribute, errors|
            tag.li do
              tag.a(href: "##{builder.field_id(attribute)}-input", class: "js-error-summary-link") do
                errors.first.full_message
              end
            end
          end
          safe_join(items)
        end
      end

      def autofocus?
        fetch_or_fallback_boolean(options[:autofocus], fallback: true)
      end

      def heading_level
        options[:heading_level].to_i.clamp(2, 6)
      end
    end
  end
end
