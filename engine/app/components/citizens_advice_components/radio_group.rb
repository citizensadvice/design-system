# frozen_string_literal: true

module CitizensAdviceComponents
  class RadioGroup < Base
    attr_reader :legend, :name, :error_message, :hint, :size, :layout

    renders_many :radio_buttons, "RadioButton"

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
          ("cads-radio-group--#{@size.to_s.dasherize}" if size?),
          ("cads-radio-group--#{@layout.to_s.dasherize}" if layout?)
        ]
      }
    end

    class RadioButton < Base
      attr_reader :label

      def initialize(label:, value:, checked: false, **additional_attributes)
        super
        @label = label
        @value = value
        @checked = fetch_or_fallback_boolean(checked, fallback: false)
        @additional_attributes = additional_attributes
      end

      def attributes(name)
        attrs = base_attributes(name)
        return attrs if @additional_attributes.blank?

        attrs.merge(@additional_attributes)
      end

      def base_attributes(name)
        {
          type: "radio",
          id: format_button_id(name),
          name: name,
          value: @value,
          checked: @checked
        }
      end

      def format_button_id(name)
        "#{name}-#{@value}"
      end
    end
  end
end
