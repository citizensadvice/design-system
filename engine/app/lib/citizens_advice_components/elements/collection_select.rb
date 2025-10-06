# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class CollectionSelect < Base
      include Traits::Field

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

      def required?
        @required.present?
      end

      # Don't support page heading for selects
      def page_heading?
        false
      end

      def render_field
        builder.collection_select(
          attribute,
          collection,
          value_method,
          text_method,
          options,
          html_options
        )
      end

      private

      def html_options
        @html_options.with_defaults({
          id: input_id,
          class: class_names("cads-select", "cads-input"),
          required: false, # use aria-required over required attribute
          "aria-required": required?,
          "aria-invalid": error?,
          "aria-describedby": described_by
        }.merge(@additional_attributes || {}))
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
    end
  end
end
