# frozen_string_literal: true

module CitizensAdviceComponents
  class Table < Base
    attr_reader :header, :caption

    def initialize(header:, rows:, caption: nil)
      super
      @header = header
      @rows = rows
      @caption = caption
    end

    def rows
      @rows.reject do |row|
        row.flatten.reject { |item| item.to_s.empty? }.blank?
      end
    end

    def caption?
      caption.present?
    end

    def render?
      header.present? && rows.present?
    end
  end
end
