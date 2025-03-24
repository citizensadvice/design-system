# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class ErrorSummary < Base
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
        # We still support Rails 6.1 but rely on the use of field_name
        # so we provide a shim for this method for older versions of Rails.
        if Rails::VERSION::MAJOR < 7
          field_id_shim(object_name, attribute)
        else
          @template.field_id(object_name, attribute)
        end
      end
    end
  end
end
