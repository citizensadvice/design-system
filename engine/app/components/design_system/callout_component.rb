# frozen_string_literal: true

module DesignSystem
  class CalloutComponent < ViewComponent::Base
    include ActiveModel::Validations

    attr_reader :type, :body

    VALID_TYPES = %w[standard example important adviser].freeze

    validates(
      :type,
      inclusion: {
        in: VALID_TYPES,
        message: "%{value} must be one of #{VALID_TYPES.join(', ')}"
      },
      allow_nil: true
    )

    def initialize(body:, type: nil)
      super

      @type = type || "standard"
      @body = body
    end

    def before_render
      validate!
    end
  end
end
