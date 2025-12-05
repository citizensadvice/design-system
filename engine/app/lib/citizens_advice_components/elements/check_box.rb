# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class CheckBox < Base
      include Traits::Field
      include ActionView::Context

      delegate :content_tag, :tag, :safe_join, :link_to, :capture, to: :@template

      attr_reader :template, :object, :attribute
      attr_accessor :options

      def initialize(builder, template, object, attribute, **kwargs)
        super(builder, template, object)

        @attribute = attribute
        @options = kwargs
        additional_attributes_deprecation
      end

      protected

      # Single checkboxes behave a little differently
      # where they use form *group* markup mixed in
      # with *field* markup. This is because they share
      # markup with a group of checkboxes. This results
      # in some slightly off markup which suggests a
      # refactoring is needed eventually.
      def render_content
        tag.div(class: "cads-form-field__content") do
          tag.div(class: "cads-form-group cads-form-group--checkbox cads-checkbox-single") do
            safe_join([render_error_message, render_item])
          end
        end
      end

      def render_item
        tag.div(class: "cads-form-group__item") do
          render_check_box + render_check_box_label
        end
      end

      def render_check_box
        builder.check_box(
          attribute,
          class: class_names("cads-form-group__input"),
          id: input_id,
          required: false, # use aria-required over required attribute
          "aria-required": required?,
          "aria-invalid": error?,
          "aria-describedby": described_by,
          **check_box_options
        )
      end

      def render_check_box_label
        builder.label(attribute, class: "cads-form-group__label", id: label_id, for: input_id) do |label_builder|
          label.presence || label_builder.translation
        end
      end

      def fieldset_classes
        class_names(
          "cads-form-group",
          "cads-form-group--checkbox",
          "cads-checkbox-single"
        )
      end

      def check_box_options
        # The default behaviour of text_field is to pass options on to the HTML element
        # Extract any custom options that we don't want passing on and add expected defaults.
        # For backwards compatability merge in additional_options hash
        options_for_html.merge(options[:additional_attributes] || {})
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
