# frozen_string_literal: true

module CitizensAdviceComponents
  class RadioGroup < Base
    attr_reader :legend, :name, :error_message, :hint, :size, :layout

    renders_many :radio_buttons, Checkable::Radio

    def initialize(legend:, name:, options: nil)
      super
      @legend = legend
      @name = name

      set_options(options)
    end

    def set_options(options)
      return if options.blank?

      @error_message = options[:error_message]
      @hint = options[:hint]
      @optional = fetch_or_fallback_boolean(options[:optional], fallback: false)
      @size = fetch_or_fallback(given_value: options[:size], allowed_values: [nil, :regular, :small], fallback: :regular)
      @layout = fetch_or_fallback(given_value: options[:layout], allowed_values: [nil, :list, :inline], fallback: :list)
    end

    def render?
      radio_buttons.present?
    end

    def error?
      @error_message.present?
    end

    def optional?
      @optional.present?
    end

    def size?
      @size.present?
    end

    def layout?
      @layout.present?
    end

    def hint?
      @hint.present?
    end

    def fieldset_attributes
      {
        class: [
          ("cads-form-group--#{@size.to_s.dasherize}" if size?),
          ("cads-form-group--#{@layout.to_s.dasherize}" if layout?)
        ]
      }
    end
  end
end
