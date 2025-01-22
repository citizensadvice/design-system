# frozen_string_literal: true

module CitizensAdviceComponents
  class SummaryList < Base
    def initialize(items:, hide_empty_rows: false)
      @items = items
      @hide_empty_rows = hide_empty_rows
    end

    def items
      if hide_empty_rows?
        @items.reject { |field| field[:value].blank? }
      else
        @items
      end
    end

    def hide_empty_rows?
      @hide_empty_rows
    end

    def render?
      items.present?
    end
  end
end
