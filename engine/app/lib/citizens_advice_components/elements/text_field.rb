# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class TextField < Base
      include Traits::Field
      include CitizensAdviceComponents::FetchOrFallbackHelper

      def initialize(
        builder,
        template,
        object,
        attribute,
        options
      )
        super(builder, template, object)

        @attribute = attribute
        @options = options
        additional_attributes_deprecation
      end

      private

      def render_field
        builder.text_field(
          attribute,
          class: class_names("cads-input", "cads-input--#{width.to_s.dasherize}": width.present?),
          id: input_id,
          required: false, # use aria-required over required attribute
          "aria-required": required?,
          "aria-invalid": error?,
          "aria-describedby": described_by,

          **text_field_options
        )
      end

      def text_field_options
        # The default behaviour of text_field is to pass options on to the HTML element
        # Extract any custom options that we don't want passing on and add expected defaults.
        # For backwards compatability merge in additional_options hash
        options_for_html
          .without(:width)
          .merge(options[:additional_attributes] || {})
      end

      def additional_attributes_deprecation
        return if options[:additional_attributes].blank?

        CitizensAdviceComponents.deprecator.warn(
          "additional_attributes hash is deprecated, pass directly via options hash"
        )
      end

      def width
        fetch_or_fallback(
          allowed_values: [nil, :two_chars, :four_chars, :eight_chars, :sixteen_chars],
          given_value: options[:width],
          fallback: nil
        )
      end
    end
  end
end
