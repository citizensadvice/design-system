# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class CollectionCheckBoxes < Base
      include Traits::FieldGroup
      include ActionView::Helpers::FormOptionsHelper

      attr_reader :collection, :value_method, :text_method, :label, :hint

      def initialize(
        builder,
        template,
        object,
        object_name,
        attribute,
        collection,
        value_method,
        text_method,
        options = {},
        html_options = {},
        # Accept our custom named parameters after the defaults
        label: nil,
        hint: nil,
        required: false,
        page_heading: false,
        # Deprecated options
        collection_param: nil,
        text_method_param: nil,
        value_method_param: nil,
        additional_attributes: nil
      )
        super(builder, template, object, object_name)

        @attribute = attribute
        @collection = collection_param || collection
        @text_method = text_method_param || text_method
        @value_method = value_method_param || value_method
        @options = options
        @html_options = html_options

        # Custom properties
        @label = label
        @hint = hint
        @required = required
        @page_heading = page_heading

        # Deprecated properties
        @collection_param = collection_param
        @text_method_param = text_method_param
        @value_method_param = value_method_param
        @additional_attributes = additional_attributes
        collection_param_deprecation
        text_method_param_deprecation
        value_method_param_deprecation
        additional_attributes_deprecation
      end

      protected

      def render_field_group
        checkboxes = collection.map.with_index do |item, index|
          tag.div(class: "cads-form-group__item") do
            render_input_for(item, index) +
              tag.label(class: "cads-form-group__label", for: item_id(index)) do
                value_for_collection(item, text_method)
              end
          end
        end

        safe_join([render_hidden_field, checkboxes])
      end

      def fieldset_classes
        class_names(
          "cads-form-group",
          "cads-form-group--checkbox"
        )
      end

      def required?
        @required.present?
      end

      def page_heading?
        @page_heading.present?
      end

      private

      def render_input_for(item, index)
        tag.input(
          class: "cads-form-group__input",
          type: "checkbox",
          id: item_id(index),
          name: "#{builder.field_name(attribute)}[]",
          value: value_for_collection(item, value_method),
          checked: Array(value_for_collection(item, value_method)).include?(current_value)
        )
      end

      def render_hidden_field
        tag.input(
          type: "hidden",
          name: "#{builder.field_name(attribute)}[]",
          value: ""
        )
      end

      def collection_param_deprecation
        return if @collection_param.blank?

        CitizensAdviceComponents.deprecator.warn(
          "collection named parameter is deprecated, pass as positional parameter"
        )
      end

      def text_method_param_deprecation
        return if @text_method_param.blank?

        CitizensAdviceComponents.deprecator.warn(
          "text_method named parameter is deprecated, pass as positional parameter"
        )
      end

      def value_method_param_deprecation
        return if @value_method_param.blank?

        CitizensAdviceComponents.deprecator.warn(
          "value_method named parameter is deprecated, pass as positional parameter"
        )
      end

      def additional_attributes_deprecation
        return if @additional_attributes.blank?

        CitizensAdviceComponents.deprecator.warn(
          "additional_attributes hash is deprecated, pass directly via options hash"
        )
      end

      def item_id(index)
        if index.zero?
          "#{builder.field_id(attribute)}-input"
        else
          "#{builder.field_id(attribute)}-#{index}"
        end
      end

      def current_value
        object.send(attribute)
      end
    end
  end
end
