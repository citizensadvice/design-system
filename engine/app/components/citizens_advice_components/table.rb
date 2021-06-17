# frozen_string_literal: true

module CitizensAdviceComponents
  class Table < Base
    attr_reader :header, :rows, :caption 

    def initialize(header:, rows:, caption: nil)
      super
      @header = header
      @rows = rows
      @caption = caption
    end

    def render?
      @rows.present?
    end

    def caption?
      @caption.present?
    end
  end
end
