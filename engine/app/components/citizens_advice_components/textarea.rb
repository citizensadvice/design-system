# frozen_string_literal: true

module CitizensAdviceComponents
  class Textarea < Input
    attr_reader :base_input_args

    DEFAULT_ROWS = 8

    def initialize(rows: DEFAULT_ROWS, **args)
      @rows = format_rows(rows)
      @base_input_args = args.merge(type: nil)
      super(**@base_input_args)
    end

    def format_rows(rows)
      rows.to_i.zero? ? DEFAULT_ROWS : rows
    end

    def base_input_attributes
      super.merge(rows: @rows, value: nil)
    end
  end
end
