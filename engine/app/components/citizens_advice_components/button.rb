# frozen_string_literal: true

module CitizensAdviceComponents
  class Button < Base
    renders_one :icon_left
    renders_one :icon_right

    attr_reader :variant, :type, :additional_attributes

    def initialize(variant: :primary, type: :button, additional_attributes: {})
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
      @additional_attributes = additional_attributes
    end

    def render?
      content.present?
    end
  end
end
