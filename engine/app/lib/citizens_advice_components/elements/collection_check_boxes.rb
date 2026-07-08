# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class CollectionCheckBoxes < Base
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
        builder.collection_check_boxes(
          attribute,
          collection,
          value_method,
          text_method,
          options,
          html_options
        ) do |check_box_builder|
          tag.div(class: "cads-form-group__item") { check_box_for(check_box_builder) }
        end
      end

      def fieldset_classes
        class_names(
          "cads-form-group",
          "cads-form-group--checkbox"
        )
      end

      private

      def check_box_for(check_box_builder)
        index = collection.find_index check_box_builder.object
        id = "#{builder.field_id(attribute)}-#{index.zero? ? 'input' : index}"
        safe_join([
          check_box_builder.check_box(class: "cads-form-group__input", id: id),
          check_box_builder.label(class: "cads-form-group__label", for: id) { check_box_builder.text }
        ])
      end
    end
  end
end
