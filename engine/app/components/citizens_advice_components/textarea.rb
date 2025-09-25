# frozen_string_literal: true

module CitizensAdviceComponents
  class Textarea < Base
    DEFAULT_ROWS = 8

    attr_reader :name, :label, :error_message, :hint, :value, :id

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

      @value = options[:value]
      @additional_attributes = options[:additional_attributes]
    end

    def format_rows(rows)
      rows.to_i.zero? ? DEFAULT_ROWS : rows
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

    def described_by
      ids = []
      ids << error_id if error?
      ids << hint_id if hint?
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

    def input_attributes
      if @additional_attributes.present?
        base_input_attributes.merge @additional_attributes
      else
        base_input_attributes
      end
    end
  end
end
