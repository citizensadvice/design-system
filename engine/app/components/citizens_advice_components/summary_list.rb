# frozen_string_literal: true

module CitizensAdviceComponents
  class SummaryList < Base
    attr_reader :items

    def initialize(items:)
      super
      @items = items
    end

    def render?
      @items.present?
    end
  end
end
