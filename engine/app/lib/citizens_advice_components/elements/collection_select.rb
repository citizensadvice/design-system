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
        @collection = collection
        @text_method = text_method
        @value_method = value_method
        @options = options
        @html_options = html_options
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
        })
      end
    end
  end
end
