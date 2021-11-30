# frozen_string_literal: true

module CitizensAdviceComponents
  class ErrorSummary < Base
    renders_many :errors, "Error"

    def render?
      errors.present?
    end

    class Error
      attr_reader :href, :message

      def initialize(href:, message:)
        @href = href
        @message = message
      end
    end
  end
end
