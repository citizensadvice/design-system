# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    module Traits
      module Field
        include Label
        include Optional
        include Hint
        include Errors

        attr_accessor :builder, :attribute, :options

        def render
          tag.div(class: class_names("cads-form-field", "cads-form-field--has-error": error?)) do
            safe_join([
              render_error_marker,
              render_content
            ])
          end
        end

        protected

        def render_field
          # Implemented by including class
          nil
        end

        private

        def render_content
          tag.div(class: "cads-form-field__content") do
            safe_join([
              render_label,
              render_hint,
              render_error_message,
              render_field
            ])
          end
        end

        def render_label
          if page_heading?
            render_label_page_heading
          else
            render_label_default
          end
        end

        def render_label_page_heading
          tag.h1(class: "cads-page-title") do
            builder.label(attribute, id: label_id, for: input_id) do |label_builder|
              label.presence || label_builder.translation
            end
          end
        end

        def render_label_default
          builder.label(attribute, class: "cads-form-field__label", id: label_id, for: input_id) do |label_builder|
            safe_join([
              label.presence || label_builder.translation,
              render_optional
            ], " ")
          end
        end

        def described_by
          ids = []
          ids << error_id if error?
          ids << hint_id if hint.present?
          ids.present? ? ids.join(" ") : nil
        end

        def input_id
          # Could refactor to builder.field_id(attribute, :input)
          "#{builder.field_id(attribute)}-input"
        end

        def options_for_html
          options.without(:label, :hint, :required, :page_heading, :additional_attributes)
        end
      end
    end
  end
end
