# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class CollectionSelect < Base
      include Traits::Field

      attr_reader :collection, :value_method, :text_method

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

        # Handle deprecating named parmeters in favour Rails default positional paramaters
        # for collection, text method, and value method
        collection_params_deprecation if collection.is_a?(Hash)

        @collection = collection.is_a?(Hash) ? collection[:collection] : collection
        @text_method = collection.is_a?(Hash) ? collection[:text_method] : text_method
        @value_method = collection.is_a?(Hash) ? collection[:value_method] : value_method

        @options = options
        @html_options = html_options

        additional_attributes_deprecation
      end

      protected

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
        }.merge(options[:additional_attributes] || {}))
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
    end
  end
end
