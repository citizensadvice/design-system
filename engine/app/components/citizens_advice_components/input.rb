# frozen_string_literal: true

module CitizensAdviceComponents
  class Input < Base
    attr_reader :name, :label, :error_message, :hint, :value, :id

    def initialize(name:, label:, type:, options: nil, id: nil)
      super
      @name = name
      @id = id
      @label = label
      @type = fetch_or_fallback(
        allowed_values: allowed_type_values,
        given_value: type.presence,
        fallback: :text
      )

      set_options(options)
    end

    def render_content
      content.presence || tag.input(class: "cads-input", **input_attributes)
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

    def allowed_type_values
      [
        :color,
        :date,
        :datetime_local,
        :email,
        :file,
        :hidden,
        :image,
        :month,
        :number,
        :password,
        :search,
        :tel,
        :text,
        :time,
        :url,
        :week,
        nil
      ]
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

    def base_input_attributes
      {
        type: (@type.to_s.dasherize if @type.present?),
        id: input_id,
        name: name,
        value: value,
        "aria-required": required?,
        "aria-invalid": error?,
        "aria-describedby": described_by
      }
    end

    def described_by
      described_by_ids.present? ? described_by_ids.join(" ") : nil
    end

    def described_by_ids
      ids = []
      ids << error_id if error?
      ids << hint_id if hint?
      ids
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
