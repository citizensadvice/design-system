# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class TextInput < Base
      def render
        component = CitizensAdviceComponents::TextInput.new(
          name: field_name,
          id: field_id,
          label: label,
          type: :text,
          width: options[:width],
          options: {
            hint: hint,
            optional: optional,
            value: current_value,
            error_message: error_message,
            additional_attributes: options[:additional_attributes],
            page_heading: options[:page_heading].present?
          }
        )

        component.render_in(@template)
      end
    end
  end
end
