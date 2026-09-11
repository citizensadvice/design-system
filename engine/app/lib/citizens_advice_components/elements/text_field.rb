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
          **options_for_html.without(:width)
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
