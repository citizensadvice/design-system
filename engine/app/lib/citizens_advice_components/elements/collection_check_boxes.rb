# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class CollectionCheckBoxes < Base
      include Traits::FieldGroup
      include ActionView::Helpers::FormOptionsHelper

      attr_reader :collection, :value_method, :text_method

      def initialize(
        builder,
        template,
        object,
        attribute,
        collection_or_options,
        value_method,
        text_method,
        options = {},
        html_options = {}
      )
        super(builder, template, object)

        @attribute = attribute

        # The standard Rails collection_radio_buttons method accepts collection,
        # text_method, and value_method as positional arguments followed by an options
        # and separate html_options hash. Our original component accepted named arguments.
        #
        # If collection is a hash then we have the older named arguments format so we
        # need to extract our expected paramters out of the hash. Otherwise use the new defaults.
        if collection_or_options.is_a? Hash
          collection_params_deprecation

          @collection = collection_or_options[:collection]
          @text_method = collection_or_options[:text_method]
          @value_method = collection_or_options[:value_method]

          @options = collection_or_options.without(:collection, :text_method, :value_method)
          @html_options = {} # html_options not supported in this format
        else
          @collection = collection_or_options
          @text_method = text_method
          @value_method = value_method

          @options = options
          @html_options = html_options
        end

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

      def collection_params_deprecation
        CitizensAdviceComponents.deprecator.warn(
          "collection, text_method, and value_method named parameters are deprecated, pass as positional parameter"
        )
      end

      def additional_attributes_deprecation
        return if options[:additional_attributes].blank?

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
