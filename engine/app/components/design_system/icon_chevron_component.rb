# frozen_string_literal: true

module DesignSystem
  class IconChevronComponent < ViewComponent::Base
    include ActiveModel::Validations

    attr_reader :variant

    VARIANTS = %w[left right].freeze

    validates(
      :variant,
      inclusion: {
        in: VARIANTS,
        message: "%{value} must be one of #{VARIANTS.join(', ')}"
      }
    )

    def initialize(
      variant:
    )
      super
      @variant = variant
    end

    def before_render
      validate!
    end
  end
end
