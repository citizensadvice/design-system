# frozen_string_literal: true

module CitizensAdviceComponents
  class Callout < Base
    attr_reader :type, :attributes

    def initialize(type: nil, attributes: nil)
      @type = fetch_or_fallback(
        allowed_values: %i[standard example important adviser],
        given_value: type,
        fallback: :standard
      )
      @attributes = attributes.to_h
    end

    def show_badge?
      type != :standard
    end

    def render?
      content.present?
    end
  end
end
