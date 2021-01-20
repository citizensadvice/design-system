# frozen_string_literal: true

module DesignSystem
  class RadioGroupComponent < ViewComponent::Base
    attr_reader :name, :label, :options, :hint, :value, :error_message

    # rubocop:disable Metrics/ParameterLists
    def initialize(
      name:,
      label:,
      options:,
      hint: nil,
      is_optional: false,
      value: nil,
      error_message: nil,
      is_inline: false,
      is_small: false
    )
      super
      @name = name
      @label = label
      @options = options
      @hint = hint
      @is_optional = is_optional
      @value = value
      @error_message = error_message
      @is_inline = is_inline
      @is_small = is_small
    end
    # rubocop:enable Metrics/ParameterLists

    def error?
      !error_message.blank?
    end

    def optional?
      @is_optional
    end

    def inline?
      @is_inline
    end

    def small?
      @is_small
    end
  end
end
