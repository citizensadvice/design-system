# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    module Traits
      module FieldGroup
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

        def render_field_group
          # Implemented by including class
          nil
        end

        def fieldset_classes
          class_names("cads-form-group")
        end

        private

        def render_content
          tag.div(class: "cads-form-field__content") do
            tag.fieldset(
              class: fieldset_classes,
              "aria-describedby": fieldset_described_by
            ) do
              safe_join([
                render_legend,
                render_hint,
                render_error_message,
                render_field_group
              ])
            end
          end
        end

        def fieldset_described_by
          ids = []
          ids << error_id if error?
          ids << hint_id if hint.present?
          ids.present? ? ids.join(" ") : nil
        end

        def render_legend
          tag.legend(class: "cads-form-field__label") do
            if page_heading?
              tag.h1(class: "cads-page-title") { label_html }
            else
              safe_join([
                label_html,
                render_optional
              ], " ")
            end
          end
        end

        def label_html
          label || object.class.human_attribute_name(attribute)
        end

        def options_for_html
          options.without(:label, :hint, :required, :page_heading, :additional_attributes)
        end

        def input_id
          # Could refactor to builder.field_id(attribute, :input)
          "#{builder.field_id(attribute)}-input"
        end
      end
    end
  end
end
