# frozen_string_literal: true

module CitizensAdviceComponents
  class Callout < Base
    attr_reader :type

    def initialize(type: nil)
      super
      @type = fetch_or_fallback(
        allowed_values: %i[standard example important adviser],
        given_value: type,
        fallback: :standard
      )
    end

    def show_badge?
      type != :standard
    end

    def render?
      content.present?
    end
  end
end
