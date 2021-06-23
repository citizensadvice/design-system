# frozen_string_literal: true

module CitizensAdviceComponents
  class FormField < Base
    def initialize(error: false)
      super
      @error = fetch_or_fallback_boolean(error, fallback: false)
    end

    def error?
      @error
    end
  end
end
