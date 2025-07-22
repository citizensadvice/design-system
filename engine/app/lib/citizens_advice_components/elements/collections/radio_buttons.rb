# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    module Collections
      class RadioButtons < Base
        def render
          tag.div(class: form_field_classes) do
            safe_join([
              error_marker,
              tag.div(class: "cads-form-field__content") do
                tag.fieldset(class: "cads-form-group cads-form-group--radio") do
                  safe_join([legend_html, hint_html, error_message_html, radios_html])
                end
              end
            ])
          end
        end

        private

        def items
          @options[:collection].map do |item|
            label = value_for_collection(item, text_method)
            value = value_for_collection(item, value_method)
            checked = value.eql?(current_value)

            {
              name: field_name,
              label: label,
              value: value,
              checked: checked
            }
          end
        end

        # rubocop:disable Metrics/AbcSize
        def radios_html
          radios = items.map.with_index do |item, index|
            tag.div(class: "cads-form-group__item") do
              tag.input(
                class: "cads-form-group__input",
                type: "radio",
                id: item_id(index),
                name: field_name.to_s,
                value: item[:value],
                checked: item[:checked]
              ) +
                tag.label(class: "cads-form-group__label", for: item_id(index)) { item[:label] }
            end
          end

          safe_join(radios)
        end
        # rubocop:enable Metrics/AbcSize
      end
    end
  end
end
