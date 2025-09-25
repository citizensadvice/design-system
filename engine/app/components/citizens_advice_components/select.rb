# frozen_string_literal: true

module CitizensAdviceComponents
  class Select < Base
    attr_reader :name, :label, :select_options, :id, :error_message, :hint, :value

    def initialize(name:, label:, select_options:, grouped: false, id: nil, options: nil, type: nil)
      @name = name
      @label = label
      @select_options = select_options
      @grouped = fetch_or_fallback_boolean(grouped, fallback: false)
      @id = id
      @type = type

      set_options(options)
      type_deprecation
    end

    def render_select_options
      options_for_select(select_options, value)
    end

    private

    def type_deprecation
      return if @type.blank?

      CitizensAdviceComponents.deprecator.warn(
        "The type argument is deprecated, type is not a valid property of a <select>"
      )
    end

    def set_options(options)
      return if options.blank?

      @value = options[:value]
      @hint = options[:hint]
      @error_message = options[:error_message]
      @optional = fetch_or_fallback_boolean(options[:optional], fallback: false)
      @additional_attributes = options[:additional_attributes]
    end

    def grouped?
      @grouped
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

    def base_input_attributes
      {
        id: input_id,
        name: name,
        "aria-required": required?,
        "aria-invalid": error?,
        "aria-describedby": described_by
      }
    end

    def described_by
      ids = []
      ids << error_id if error?
      ids << hint_id if hint?
      ids.present? ? ids.join(" ") : nil
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
