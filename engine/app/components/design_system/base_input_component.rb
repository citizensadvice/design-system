# frozen_string_literal: true

module DesignSystem
  class BaseInputComponent < ViewComponent::Base
    attr_reader :name, :label, :hint, :is_optional, :value, :error_message

    # rubocop:disable Metrics/ParameterLists
    def initialize(
      name:,
      label:,
      hint: nil,
      is_optional: false,
      value: nil,
      error_message: nil
    )
      super
      @name = name
      @label = label
      @hint = hint
      @is_optional = is_optional
      @error_message = error_message
      @value = value
    end
    # rubocop:enable Metrics/ParameterLists

    def error?
      !error_message.blank?
    end

    def optional?
      is_optional
    end
  end
end
