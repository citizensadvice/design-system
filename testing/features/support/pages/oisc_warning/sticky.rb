# frozen_string_literal: true

require_relative "title_description"

module OISCWarning
  class Sticky < TitleDescription
    set_url "/iframe.html?id=components-oisc-warning--sticky"

    element :heading, "h2.cads-oisc-warning__title"
    element :description, ".cads-oisc-warning__body > p"
    element :close_sticky, ".cads-icon_close"

    def vertical_position_of(element)
      element.native.rect[:y]
    end
  end
end
