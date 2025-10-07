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
