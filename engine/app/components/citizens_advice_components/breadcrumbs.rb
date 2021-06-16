# frozen_string_literal: true

module CitizensAdviceComponents
  class Breadcrumbs < Base
    attr_reader :type

    def initialize(links:, type: :collapse, current_page: true)
      super
      @links = links
      @type = fetch_or_fallback(allowed_values: %i[collapse no_collapse], given_value: type, fallback: :collapse)
      @current_page = fetch_or_fallback_boolean(current_page, fallback: true)
    end

    def render?
      @links.present?
    end

    def links
      @links.map(&:symbolize_keys)
    end
  end
end
