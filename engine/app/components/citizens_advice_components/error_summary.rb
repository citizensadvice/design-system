# frozen_string_literal: true

module CitizensAdviceComponents
  class ErrorSummary < Base
    renders_many :errors, "Error"

    def initialize(heading_level: nil)
      super
      @heading_level = heading_level || 2
    end

    def heading_level
      @heading_level.to_i.clamp(2, 6)
    end

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
