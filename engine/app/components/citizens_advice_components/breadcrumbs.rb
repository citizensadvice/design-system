# frozen_string_literal: true

module CitizensAdviceComponents
  class Breadcrumbs < Base
    attr_reader :type

    def initialize(links:, type: :collapse, current_page: true, full_width: true)
      super
      @links = links
      @type = fetch_or_fallback(allowed_values: %i[collapse no_collapse], given_value: type, fallback: :collapse)
      @current_page = fetch_or_fallback_boolean(current_page, fallback: true)
      @full_width = fetch_or_fallback_boolean(full_width, fallback: true)
    end

    def render?
      @links.present? && @links.size > 1
    end

    def links
      @links.map(&:symbolize_keys)
    end

    def full_width?
      @full_width
    end

    def current_page?
      @current_page
    end
  end
end
