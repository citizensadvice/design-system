# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class CheckBox < Base
      def render
        safe_join([hidden_field, checkbox_field])
      end

      private

      def checkbox_field
        component = CitizensAdviceComponents::CheckboxSingle.new(
          name: field_name,
          id: field_id,
          error_message: error_message
        )
        component.with_checkbox(label: label,
                                value: "1",
                                checked: current_value,
                                additional_attributes: options[:additional_attributes])

        component.render_in(@template)
      end

      def hidden_field
        tag.input(
          type: "hidden",
          name: field_name,
          value: "0"
        )
      end
    end
  end
end
