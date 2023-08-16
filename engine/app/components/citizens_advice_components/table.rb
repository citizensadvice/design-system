# frozen_string_literal: true

module CitizensAdviceComponents
  class Table < Base
    attr_reader :header, :caption

    def initialize(header:, rows:, caption: nil, responsive_headers: true)
      super
      @header = header
      @rows = rows
      @caption = caption
      @responsive_headers = responsive_headers
    end

    def rows
      @rows.reject do |row|
        row.flatten.reject { |item| item.to_s.empty? }.blank?
      end
    end

    def caption?
      caption.present?
    end

    def responsive_headers?
      @responsive_headers.present?
    end

    def render?
      header.present? && rows.present?
    end

    def table_class_names
      classes = ["cads-table"]
      classes << "cads-table--captioned" if caption?
      classes << "cads-table--responsive-headers" if responsive_headers?
    end
  end
end
