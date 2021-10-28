# frozen_string_literal: true

module CitizensAdviceComponents
  class FormGroup < Base
    attr_reader :legend, :name, :error_message, :hint, :size, :layout

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

    def common_fieldset_classes
      %w[cads-form-field__content cads-form-group]
    end

    def fieldset_classes
      raise NotImplementedError
    end

    def input_type
      Checkable::Checkbox
    end

    def render?
      inputs.present?
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
