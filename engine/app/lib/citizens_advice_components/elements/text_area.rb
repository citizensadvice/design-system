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
          **character_count_attributes,
          **text_area_options
        ) + render_character_count
      end

      def render_character_count
        return unless character_count?

        tag.div(id: character_count_id, class: "cads-character-count js-cads-character-count-fallback") do
          I18n.t("citizens_advice_components.character_count.fallback", character_count: character_count)
        end
      end

      def described_by
        ids = []
        ids << error_id if error?
        ids << hint_id if hint.present?
        ids << character_count_id if character_count?
        ids.present? ? ids.join(" ") : nil
      end

      def character_count_id
        "#{builder.field_id(attribute)}-info"
      end

      def text_area_options
        # The default behaviour of text_field is to pass options on to the HTML element
        # Extract any custom options that we don't want passing on and add expected defaults.
        # For backwards compatability merge in additional_options hash
        options_for_html
          .without(:rows)
          .without(:character_count)
          .merge(options[:additional_attributes] || {})
      end

      def character_count_attributes
        return {} unless character_count?

        {
          "data-character-count": character_count,
          "data-character-count-over-limit": I18n.t("citizens_advice_components.character_count.over_limit"),
          "data-character-count-remaining-zero": I18n.t("citizens_advice_components.character_count.remaining_zero"),
          "data-character-count-remaining-one": I18n.t("citizens_advice_components.character_count.remaining_one"),
          "data-character-count-remaining-other": I18n.t("citizens_advice_components.character_count.remaining_other")
        }
      end

      def additional_attributes_deprecation
        return if options[:additional_attributes].blank?

        CitizensAdviceComponents.deprecator.warn(
          "additional_attributes hash is deprecated, pass directly via options hash"
        )
      end

      def character_count?
        character_count.present?
      end

      def character_count
        options[:character_count]
      end

      def rows
        options[:rows].to_i.zero? ? 8 : options[:rows]
      end
    end
  end
end
