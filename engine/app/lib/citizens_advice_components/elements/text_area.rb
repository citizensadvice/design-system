# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class TextArea < Base
      def render
        component.render_in(@template)
      end

      private

      def component
        CitizensAdviceComponents::Textarea.new(
          name: field_name,
          id: field_id,
          label: label,
          rows: options[:rows],
          options: component_options
        )
      end

      def component_options
        {
          hint: hint,
          optional: optional,
          value: current_value,
          error_message: error_message,
          additional_attributes: options[:additional_attributes],
          page_heading: options[:page_heading].present?,
          character_count: options[:character_count]
        }
      end
    end
  end
end
