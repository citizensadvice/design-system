# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    module Collections
      class CheckBoxes < Base
        def render
          tag.div(class: form_field_classes) do
            safe_join([
              error_marker,
              tag.div(class: "cads-form-field__content") do
                render_fieldset
              end
            ])
          end
        end

        private

        def render_fieldset
          tag.fieldset(
            class: "cads-form-group cads-form-group--checkbox",
            "aria-describedby": fieldset_described_by
          ) do
            safe_join([
              legend_html,
              hint_html,
              error_message_html,
              checkboxes_html
            ])
          end
        end

        def fieldset_described_by
          ids = []
          ids << error_id if error?
          ids << hint_id if hint.present?
          ids.present? ? ids.join(" ") : nil
        end

        def items
          @options[:collection].map do |item|
            label = value_for_collection(item, text_method)
            value = value_for_collection(item, value_method)
            checked = Array(current_value).include?(value)

            {
              name: field_name,
              label: label,
              value: value,
              checked: checked
            }
          end
        end

        # rubocop:disable Metrics/AbcSize
        def checkboxes_html
          checkboxes = items.map.with_index do |item, index|
            tag.div(class: "cads-form-group__item") do
              tag.input(
                class: "cads-form-group__input",
                type: "checkbox",
                id: item_id(index),
                name: "#{field_name}[]",
                value: item[:value],
                checked: item[:checked]
              ) +
                tag.label(class: "cads-form-group__label", for: item_id(index)) { item[:label] }
            end
          end

          safe_join([checkboxes, hidden_field])
        end
        # rubocop:enable Metrics/AbcSize

        def hidden_field
          tag.input(
            type: "hidden",
            name: "#{field_name}[]",
            value: ""
          )
        end
      end
    end
  end
end
