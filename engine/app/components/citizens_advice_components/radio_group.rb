# frozen_string_literal: true

module CitizensAdviceComponents
  class RadioGroup < FormGroup
    renders_many :inputs, Checkable::Radio

    def initialize(legend:, name:, id: nil, options: nil)
      super
      set_options(options)
    end

    def set_options(options)
      super
      return if options.blank?

      @size = fetch_or_fallback(given_value: options[:size], allowed_values: [nil, :regular, :small], fallback: :regular)
      @layout = fetch_or_fallback(given_value: options[:layout], allowed_values: [nil, :list, :inline], fallback: :list)
    end

    def size?
      @size.present?
    end

    def layout?
      @layout.present?
    end

    def fieldset_classes
      common_fieldset_classes << [
        "cads-form-group--radio",
        ("cads-radio-group--#{@size.to_s.dasherize}" if size?),
        ("cads-radio-group--#{@layout.to_s.dasherize}" if layout?)
      ]
    end
  end
end
