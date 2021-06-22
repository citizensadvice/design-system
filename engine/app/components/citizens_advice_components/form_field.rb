# frozen_string_literal: true

module CitizensAdviceComponents
  class FormField < Base
    
    def initialize(has_error: false)
      @has_error = fetch_or_fallback_boolean(has_error, fallback: false)
    end

    def has_error?
      @has_error
    end
  end
end