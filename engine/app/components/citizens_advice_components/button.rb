# frozen_string_literal: true

module CitizensAdviceComponents
  class Button < Base
    renders_one :icon_left
    renders_one :icon_right

    attr_reader :variant, :type

    def initialize(variant: :primary, type: :button)
      super
      @variant = fetch_or_fallback(
        allowed_values: %i[primary secondary tertiary],
        given_value: variant,
        fallback: :standard
      )
      @type = fetch_or_fallback(
        allowed_values: %i[button submit],
        given_value: type,
        fallback: :button
      )
    end

    def render?
      content.present?
    end
  end
end
