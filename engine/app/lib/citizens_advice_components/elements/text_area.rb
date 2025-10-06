# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class TextArea < Base
      include Traits::Field

      def initialize(builder, template, object, attribute, options)
        super(builder, template, object)

        @attribute = attribute
        @options = options
        additional_attributes_deprecation
      end

      private

      def render_field
        builder.text_area(
          attribute,
          class: "cads-textarea",
          id: input_id,
          rows: rows,
          required: false, # use aria-required over required attribute
          "aria-required": required?,
          "aria-invalid": error?,
          "aria-describedby": described_by,
          **text_area_options
        )
      end

      def text_area_options
        # The default behaviour of text_field is to pass options on to the HTML element
        # Extract any custom options that we don't want passing on and add expected defaults.
        # For backwards compatability merge in additional_options hash
        options_for_html
          .without(:rows)
          .merge(options[:additional_attributes] || {})
      end

      def additional_attributes_deprecation
        return if options[:additional_attributes].blank?

        CitizensAdviceComponents.deprecator.warn(
          "additional_attributes hash is deprecated, pass directly via options hash"
        )
      end

      def rows
        options[:rows].to_i.zero? ? 8 : options[:rows]
      end
    end
  end
end
