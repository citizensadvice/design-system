# frozen_string_literal: true

module CitizensAdviceComponents
  class Textarea < Input
    attr_reader :base_input_args, :character_count

    DEFAULT_ROWS = 8

    def initialize(rows: DEFAULT_ROWS, **args)
      @rows = format_rows(rows)
      @base_input_args = args.merge(type: nil)
      @character_count = args.dig(:options, :character_count)
      super(**@base_input_args)
    end

    private

    def character_count?
      character_count.present?
    end

    def described_by_ids
      super << character_count_id if character_count?
      super
    end

    def character_count_id
      "#{general_id}-info"
    end

    def format_rows(rows)
      rows.to_i.zero? ? DEFAULT_ROWS : rows
    end

    def base_input_attributes
      super.merge(rows: @rows, value: nil, "data-character-count": character_count.presence)
    end
  end
end
