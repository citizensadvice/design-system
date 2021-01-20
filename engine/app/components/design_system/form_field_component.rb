# frozen_string_literal: true

module DesignSystem
  class FormFieldComponent < ViewComponent::Base
    def initialize(has_error: false)
      super
      @has_error = has_error
    end

    def error?
      @has_error
    end
  end
end
