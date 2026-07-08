# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class TextArea < Base
      include Traits::Field

      def initialize(builder, template, object, attribute, options)
        super(builder, template, object)

        @attribute = attribute
        @options = options
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
          **options_for_html.without(:rows)
        )
      end

      def rows
        options[:rows].to_i.zero? ? 8 : options[:rows]
      end
    end
  end
end
