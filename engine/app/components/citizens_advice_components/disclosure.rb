# frozen_string_literal: true
module CitizensAdviceComponents
  class Disclosure < Base
    attr_reader :closed_summary

    def initialize(closed_summary:, open_summary: nil)
      super
      @closed_summary = closed_summary
      @open_summary = open_summary || closed_summary
    end

    def render?
      @closed_summary.present?
    end

    def disclosure_details_id
      "#{@closed_summary.parameterize}-disclosure-details"
    end

    def button_attrs
      {
        type: "button",
        class: %w[disclosure__toggle cads-icon_plus cads-linkbutton js-disclosure-toggle],
        aria: { expanded: "false", controls: disclosure_details_id },
        data: button_data_attrs
      }
    end

    def button_data_attrs
      {
        toggle_target_id: disclosure_details_id,
        label_when_hiding: @closed_summary,
        label_when_showing: @open_summary
      }
    end
  end
end
