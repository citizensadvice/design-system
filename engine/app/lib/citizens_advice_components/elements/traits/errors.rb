# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    module Traits
      module Errors
        attr_reader :builder, :attribute, :object

        def render_error_marker
          return unless error?

          tag.div(class: "cads-form-field__error-marker")
        end

        def render_error_message
          return unless error?

          tag.p(class: "cads-form-field__error-message", id: error_id) { error_message }
        end

        def error_message
          object.errors.full_messages_for(attribute)&.first
        end

        def error?
          object.respond_to?(:errors) &&
            object.errors.any? &&
            error_message.present?
        end

        def error_id
          # Could refactor to builder.field_id(attribute, :error)
          "#{builder.field_id(attribute)}-error"
        end
      end
    end
  end
end
