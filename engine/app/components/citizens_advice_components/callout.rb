# frozen_string_literal: true

module CitizensAdviceComponents
  class Callout < Base
    attr_reader :type, :title, :attributes

    def initialize(type: nil, title: nil, attributes: nil)
      super
      @type = fetch_or_fallback(
        allowed_values: %i[standard example important adviser],
        given_value: type,
        fallback: :standard
      )
      @attributes = attributes.to_h
      @title = title

      title_deprecation
    end

    def show_badge?
      type != :standard
    end

    def render?
      content.present?
    end

    def title_deprecation
      return if @title.blank?

      ActiveSupport::Deprecation.warn(
        "The title attribute is deprecated, use attributes instead"
      )
    end
  end
end
