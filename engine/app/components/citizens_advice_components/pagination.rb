# frozen_string_literal: true

module CitizensAdviceComponents
  class Pagination < Base
    def initialize(current_params:, num_pages:, current_page:, param_name: nil)
      @current_params = current_params
      @num_pages = num_pages
      @current_page = current_page
      @param_name = param_name || :page
    end

    def render?
      @num_pages > 1
    end

    def links_to_show
      links = [first_page, previous_page] | page_num_range_links | [next_page, last_page]
      links.compact
    end

    private

    def query_for(page_num)
      "?#{@current_params.merge({ @param_name => page_num }).to_query}"
    end

    def first_page
      return unless @current_page > 3

      PaginationLink.new(
        href: query_for(1),
        label: t("citizens_advice_components.pagination.first_page_label"),
        aria_label: t("citizens_advice_components.pagination.first_page_aria_label")
      )
    end

    def previous_page
      return unless @current_page > 1

      PaginationLink.new(
        href: query_for(@current_page - 1),
        label: t("citizens_advice_components.pagination.previous_page_label"),
        aria_label: t("citizens_advice_components.pagination.previous_page_aria_label")
      )
    end

    def page_num_range_links
      page_num_range.map do |num|
        PaginationLink.new(
          href: query_for(num),
          label: num,
          aria_label: t("citizens_advice_components.pagination.go_to_page", page: num),
          current: num == @current_page
        )
      end
    end

    def next_page
      return unless @current_page < @num_pages

      PaginationLink.new(
        href: query_for(@current_page + 1),
        label: t("citizens_advice_components.pagination.next_page_label"),
        aria_label: t("citizens_advice_components.pagination.next_page_aria_label")
      )
    end

    def last_page
      return unless @current_page < @num_pages - 2 && @current_page != @num_pages

      PaginationLink.new(
        href: query_for(@num_pages),
        label: t("citizens_advice_components.pagination.last_page_label"),
        aria_label: t("citizens_advice_components.pagination.last_page_aria_label")
      )
    end

    def page_num_range
      if @current_page > 3 && @num_pages > 3
        min = @current_page - 2
        max = (@current_page + 2).clamp(1, @num_pages)
      else
        min = 1
        max = [@num_pages, 3].min
      end

      min..max
    end

    # Used internally to model pages
    class PaginationLink
      attr_reader :href, :label, :aria_label

      def initialize(href:, label:, aria_label:, current: false)
        @href = href
        @label = label
        @aria_label = aria_label
        @current = current
      end

      def current?
        @current
      end

      def attrs
        {
          href: href,
          "aria-label": aria_label,
          "aria-current": ("page" if current?),
          "data-testid": "paging-control"
        }
      end
    end
  end
end
