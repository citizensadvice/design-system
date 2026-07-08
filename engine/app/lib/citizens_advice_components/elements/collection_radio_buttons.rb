# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class CollectionRadioButtons < Base
      include Traits::FieldGroup
      include ActionView::Helpers::FormOptionsHelper

      attr_reader :collection, :value_method, :text_method, :html_options

      def initialize(
        builder,
        template,
        object,
        attribute,
        collection,
        value_method,
        text_method,
        options = {},
        html_options = {}
      )
        super(builder, template, object)

        @attribute = attribute
        @collection = collection
        @text_method = text_method
        @value_method = value_method
        @options = options
        @html_options = html_options
      end

      protected

      def render_field_group
        builder.collection_radio_buttons(
          attribute,
          collection,
          value_method,
          text_method,
          options,
          html_options
        ) do |radio_builder|
          tag.div(class: "cads-form-group__item") { radio_button_for(radio_builder) }
        end
      end

      def fieldset_classes
        class_names(
          "cads-form-group",
          "cads-form-group--radio",
          "cads-radio-group--#{size.to_s.dasherize}": size.present?,
          "cads-radio-group--#{layout.to_s.dasherize}": layout.present?
        )
      end

      private

      def radio_button_for(radio_builder)
        index = collection.find_index radio_builder.object
        id = "#{builder.field_id(attribute)}-#{index.zero? ? 'input' : index}"
        safe_join([
          radio_builder.radio_button(class: "cads-form-group__input", id: id),
          radio_builder.label(class: "cads-form-group__label", for: id) { radio_builder.text }
        ])
      end

      def size
        fetch_or_fallback(
          given_value: options[:size],
          allowed_values: [nil, :regular, :small],
          fallback: :regular
        )
      end

      def layout
        fetch_or_fallback(
          given_value: options[:layout],
          allowed_values: [nil, :list, :inline],
          fallback: :list
        )
      end
    end
  end
end
