# frozen_string_literal: true

module OISCWarning
  class Sticky < TitleDescription
    set_url "/iframe.html?id=components-oisc-warning--sticky"

    element :heading, "h2.cads-oisc-warning__title"
    element :description, ".cads-oisc-warning__body > p"
    element :close_sticky, ".cads-icon_close"
  end
end
