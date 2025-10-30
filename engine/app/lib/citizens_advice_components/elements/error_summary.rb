# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class ErrorSummary < Field
      def render
        component = CitizensAdviceComponents::ErrorSummary.new
        component.with_errors(error_messages)

        component.render_in(@template)
      end

      private

      def error_messages
        object.errors.group_by_attribute.map do |attr, errors|
          {
            href: "##{field_id_for(attr)}-input",
            message: errors.first.full_message
          }
        end
      end

      def field_id_for(attribute)
        @template.field_id(object_name, attribute)
      end
    end
  end
end
