# frozen_string_literal: true

module CitizensAdviceComponents
  class SummaryList < Base
    def initialize(items:, reject_blanks: false)
      @items = items
      @reject_blanks = reject_blanks
    end

    def items
      if reject_blanks?
        @items.reject { |field| field[:value].blank? }
      else
        @items
      end
    end

    def reject_blanks?
      @reject_blanks
    end

    def render?
      items.present?
    end
  end
end
