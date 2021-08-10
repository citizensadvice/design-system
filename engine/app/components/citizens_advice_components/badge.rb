# frozen_string_literal: true

module CitizensAdviceComponents
  class Badge < Base
    attr_reader :type

    def initialize(type:)
      super

      # Fallback to nil if an invalid type is provided,
      # i.e. don't render the badge
      @type = fetch_or_fallback(
        allowed_values: %i[adviser example important],
        given_value: type,
        fallback: nil
      )
    end

    def call
      tag.span(t("citizens_advice_components.badge.#{type}"), class: "cads-badge cads-badge--#{type}")
    end

    def render?
      type.present?
    end
  end
end
