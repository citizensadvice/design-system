# frozen_string_literal: true

module CitizensAdviceComponents
  class TargetedContent < Base
    attr_reader :id, :type

    def initialize(
      title:,
      id:,
      type: :public,
      heading_level: nil,
      show_close_button: nil
    )
      @title = title
      @id = id
      @type = fetch_or_fallback(allowed_values: %i[public adviser], given_value: type, fallback: :public)
      @heading_level = heading_level || 2
      @show_close_button = fetch_or_fallback_boolean(show_close_button, fallback: true)
    end

    def title
      @title.squish
    end

    def heading_level
      @heading_level.to_i.clamp(2, 6)
    end

    def adviser?
      type == :adviser
    end

    def show_close_button?
      @show_close_button
    end

    def render?
      content.present?
    end
  end
end
