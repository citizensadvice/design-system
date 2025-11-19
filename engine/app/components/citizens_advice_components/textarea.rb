# frozen_string_literal: true

module CitizensAdviceComponents
  class Textarea < Base
    DEFAULT_ROWS = 8

    attr_reader :name, :label, :error_message, :hint, :value, :id, :character_count

    def initialize(name:, label:, rows: DEFAULT_ROWS, id: nil, options: nil, type: nil)
      @name = name
      @id = id
      @label = label
      @rows = rows.to_i.zero? ? DEFAULT_ROWS : rows
      @type = type

      set_options(options)
      type_deprecation
    end

    private

    def type_deprecation
      return if @type.blank?

      CitizensAdviceComponents.deprecator.warn(
        "The type argument is deprecated, type is not a valid property of a <textarea>"
      )
    end

    def set_options(options)
      return if options.blank?

      @error_message = options[:error_message]
      @hint = options[:hint]
      @optional = fetch_or_fallback_boolean(options[:optional], fallback: false)
      @page_heading = fetch_or_fallback_boolean(options[:page_heading], fallback: false)
      @character_count = options[:character_count]

      @value = options[:value]
      @additional_attributes = options[:additional_attributes]
    end

    def format_rows(rows)
      rows.to_i.zero? ? DEFAULT_ROWS : rows
    end

    def character_count?
      @character_count.present?
    end

    def page_heading?
      @page_heading
    end

    def optional?
      @optional
    end

    def required?
      !optional?
    end

    def error?
      @error_message.present?
    end

    def hint?
      @hint.present?
    end

    def general_id
      return id if @id.present?

      name
    end

    def label_id
      "#{general_id}-label"
    end

    def input_id
      "#{general_id}-input"
    end

    def error_id
      "#{general_id}-error"
    end

    def hint_id
      "#{general_id}-hint"
    end

    def character_count_id
      "#{general_id}-info"
    end

    def described_by
      ids = []
      ids << error_id if error?
      ids << hint_id if hint?
      ids << character_count_id if character_count?
      ids.present? ? ids.join(" ") : nil
    end

    def base_input_attributes
      {
        type: (@type.to_s.dasherize if @type.present?),
        id: input_id,
        name: name,
        rows: @rows,
        "aria-required": required?,
        "aria-invalid": error?,
        "aria-describedby": described_by
      }
    end

    def character_count_attributes
      return {} unless character_count?

      {
        "data-character-count": character_count,
        "data-character-count-over-limit": t("citizens_advice_components.character_count.over_limit"),
        "data-character-count-remaining-zero": t("citizens_advice_components.character_count.remaining_zero"),
        "data-character-count-remaining-one": t("citizens_advice_components.character_count.remaining_one"),
        "data-character-count-remaining-other": t("citizens_advice_components.character_count.remaining_other")
      }
    end

    def additional_attributes
      return {} if @additional_attributes.blank?

      @additional_attributes
    end

    def input_attributes
      base_input_attributes.merge(
        character_count_attributes,
        additional_attributes
      )
    end
  end
end
