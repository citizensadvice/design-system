# frozen_string_literal: true

module CitizensAdviceComponents
  class Breadcrumbs < Base
    attr_reader :type

    def initialize(breadcrumbs, type: :collapse, current_page: true, full_width: true)
      @breadcrumbs = breadcrumbs.to_a
      @type = fetch_or_fallback(
        allowed_values: %i[collapse no_collapse],
        given_value: type,
        fallback: :collapse
      )
      @current_page = fetch_or_fallback_boolean(current_page, fallback: true)
      @full_width = fetch_or_fallback_boolean(full_width, fallback: true)
    end

    def render?
      @breadcrumbs.present? && @breadcrumbs.size > 1
    end

    private

    def breadcrumbs_html
      breadcrumbs.map.with_index do |breadcrumb, index|
        if index == breadcrumbs.size - 1
          tag.span(
            breadcrumb[:title],
            class: "cads-breadcrumb",
            "aria-current": ("location" if current_page?)
          )
        else
          tag.a(breadcrumb[:title], href: breadcrumb[:url], class: "cads-breadcrumb")
        end
      end
    end

    def breadcrumbs
      @breadcrumbs.map(&:symbolize_keys)
    end

    def full_width?
      @full_width
    end

    def current_page?
      @current_page
    end
  end
end
