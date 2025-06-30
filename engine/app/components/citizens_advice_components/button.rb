# frozen_string_literal: true

module CitizensAdviceComponents
  class Button < Base
    renders_one :icon_left
    renders_one :icon_right

    attr_reader :variant, :type, :attributes

    def initialize(variant: :primary, type: :button, attributes: nil)
      @variant = fetch_or_fallback(
        allowed_values: %i[primary secondary tertiary],
        given_value: variant,
        fallback: :primary
      )
      @type = fetch_or_fallback(
        allowed_values: %i[button submit],
        given_value: type,
        fallback: :button
      )
      @attributes = attributes || {}
    end
  end
end
