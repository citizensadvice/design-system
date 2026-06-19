# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class GroupedCollectionSelect < Base
      include Traits::Field

      attr_reader :collection, :group_method, :group_label_method, :option_key_method, :option_value_method

      def initialize(
        builder,
        template,
        object,
        attribute,
        collection,
        group_method,
        group_label_method,
        option_key_method,
        option_value_method,
        options = {},
        html_options = {}
      )
        super(builder, template, object)

        @attribute = attribute
        @collection = collection
        @group_method = group_method
        @group_label_method = group_label_method
        @option_key_method = option_key_method
        @option_value_method = option_value_method
        @options = options
        @html_options = html_options
      end

      protected

      def page_heading?
        false
      end

      def render_field
        builder.grouped_collection_select(
          attribute,
          collection,
          group_method,
          group_label_method,
          option_key_method,
          option_value_method,
          options,
          html_options
        )
      end

      private

      def html_options
        @html_options.with_defaults({
          id: input_id,
          class: class_names("cads-select", "cads-input"),
          required: false,
          "aria-required": required?,
          "aria-invalid": error?,
          "aria-describedby": described_by
        }.merge(options[:additional_attributes] || {}))
      end
    end
  end
end
