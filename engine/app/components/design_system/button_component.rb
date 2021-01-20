# frozen_string_literal: true

module DesignSystem
  class ButtonComponent < ViewComponent::Base
    include ActiveModel::Validations

    with_content_areas :icon_left, :icon_right

    attr_reader :variant, :type

    VALID_VARIANTS = %w[primary secondary tertiary].freeze

    validates(
      :variant,
      inclusion: {
        in: VALID_VARIANTS,
        message: "%{value} must be one of #{VALID_VARIANTS.join(', ')}"
      }
    )

    validates(
      :type,
      inclusion: { in: %w[button submit] }
    )

    def initialize(variant: "primary", type: "button")
      super
      @variant = variant
      @type = type
    end

    def before_render
      validate!
    end
  end
end
