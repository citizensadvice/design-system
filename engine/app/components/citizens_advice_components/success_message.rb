# frozen_string_literal: true

module CitizensAdviceComponents
  class SuccessMessage < Base
    attr_reader :message

    def initialize(message:)
      super
      @message = message
    end

    def call
      content_tag(
        :p,
        message,
        class: "cads-success-message",
        "aria-live": "polite"
      )
    end

    def render?
      message.present?
    end
  end
end
