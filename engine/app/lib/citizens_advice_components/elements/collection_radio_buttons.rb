# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class CollectionRadioButtons < Base
      include Traits::FieldGroup
      include ActionView::Helpers::FormOptionsHelper

      attr_reader :collection, :value_method, :text_method, :label, :hint

      def initialize(
        builder,
        template,
        object,
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
        layout: nil,
        size: nil,
        # Deprecated options
        collection_param: nil,
        text_method_param: nil,
        value_method_param: nil,
        additional_attributes: nil
      )
        super(builder, template, object)

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
        @layout = layout
        @size = size

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

      # rubocop:disable Metrics/AbcSize
      def render_field_group
        radios = collection.map.with_index do |item, index|
          tag.div(class: "cads-form-group__item") do
            tag.input(
              class: "cads-form-group__input",
              type: "radio",
              id: item_id(index),
              name: builder.field_name(attribute).to_s,
              value: value_for_collection(item, value_method),
              checked: value_for_collection(item, value_method).eql?(current_value)
            ) +
              tag.label(class: "cads-form-group__label", for: item_id(index)) do
                value_for_collection(item, text_method)
              end
          end
        end

        safe_join(radios)
      end

      # rubocop:enable Metrics/AbcSize
      def fieldset_classes
        class_names(
          "cads-form-group",
          "cads-form-group--radio",
          "cads-radio-group--#{size.to_s.dasherize}": size.present?,
          "cads-radio-group--#{layout.to_s.dasherize}": layout.present?
        )
      end

      def required?
        @required.present?
      end

      def page_heading?
        @page_heading.present?
      end

      private

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

      def size
        fetch_or_fallback(
          given_value: @size,
          allowed_values: [nil, :regular, :small],
          fallback: :regular
        )
      end

      def layout
        fetch_or_fallback(
          given_value: @layout,
          allowed_values: [nil, :list, :inline],
          fallback: :list
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
