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
      if character_count.present?
        super.merge(
          rows: @rows,
          value: nil,
          "data-character-count": character_count.presence,
          "data-character-count-over-limit": t("citizens_advice_components.character_count.over_limit"),
          "data-character-count-remaining-zero": t("citizens_advice_components.character_count.remaining_zero"),
          "data-character-count-remaining-one": t("citizens_advice_components.character_count.remaining_one"),
          "data-character-count-remaining-other": t("citizens_advice_components.character_count.remaining_other")
        )
      else
        super.merge(rows: @rows, value: nil)
      end
    end
  end
end
