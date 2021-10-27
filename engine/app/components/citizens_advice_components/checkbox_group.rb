# frozen_string_literal: true

module CitizensAdviceComponents
  class CheckboxGroup < ViewComponent::Base
    attr_reader :legend, :name, :error_message, :hint

    renders_many :checkboxes, Checkable::Checkbox

    def initialize(legend:, name:, options: nil)
      super
      @legend = legend
      @name = name

      set_options(options)
    end

    def set_options(options)
      return if options.blank?

      @error_message = options[:error_message]
      @hint = options[:hint]
      @optional = options[:optional]
    end

    def error?
      @error_message.present?
    end

    def optional?
      @optional.present?
    end

    def hint?
      @hint.present?
    end
  end
end
