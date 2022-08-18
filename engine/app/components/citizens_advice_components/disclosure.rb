# frozen_string_literal: true

module CitizensAdviceComponents
  class Disclosure < Base
    attr_reader :closed_summary

    def initialize(closed_summary:, open_summary: nil, additional_attributes: nil, id: nil)
      super
      @closed_summary = closed_summary
      @open_summary = open_summary || closed_summary
      @additional_attributes = additional_attributes
      @id = id
    end

    def render?
      @closed_summary.present? && content.present?
    end

    def disclosure_details_id
      @id.presence || "#{@closed_summary.parameterize}-disclosure-details"
    end

    def base_button_attrs
      {
        type: "button",
        class: %w[cads-disclosure__toggle cads-icon_plus cads-linkbutton js-disclosure-toggle],
        aria: { expanded: "false", controls: disclosure_details_id },
        data: button_data_attrs
      }
    end

    def button_data_attrs
      {
        toggle_target_id: disclosure_details_id,
        label_when_hiding: generate_label("Show this section", @closed_summary),
        label_when_showing: generate_label("Hide this section", @open_summary),
        open_summary: @open_summary,
        closed_summary: @closed_summary
      }
    end

    def generate_label(prepend_text, summary)
      if @open_summary === @closed_summary
        "#{prepend_text}, #{summary}"
      else
        summary
      end
    end

    def button_attrs
      if @additional_attributes.present?
        base_button_attrs.merge @additional_attributes
      else
        base_button_attrs
      end
    end
  end
end
