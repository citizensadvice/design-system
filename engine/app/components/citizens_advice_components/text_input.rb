# frozen_string_literal: true

module CitizensAdviceComponents
  class TextInput < Input
    attr_reader :base_input_args

    def initialize(width: nil, **args)
      @width = fetch_or_fallback(
        allowed_values: allowed_width_values,
        given_value: width,
        fallback: nil
      )
      args[:options]&.merge(width: @width)
      @base_input_args = args
      super(**@base_input_args)
    end

    def allowed_width_values
      [nil, :two_chars, :four_chars, :eight_chars, :sixteen_chars]
    end

    def allowed_type_values
      %i[
        email
        number
        password
        search
        tel
        text
        url
      ]
    end

    def width?
      @width.present?
    end

    def width_class
      "cads-input--#{@width.to_s.dasherize}"
    end

    def base_input_attributes
      super.merge(class: (width_class if width?))
    end
  end
end
