# frozen_string_literal: true

require_relative "title_description"

module OISCWarning
  class Sticky < TitleDescription
    set_url "/iframe.html?id=components-oisc-warning--sticky"

    element :heading, ".is-sticky h2"
    element :description, ".is-sticky p"
    element :close_sticky, ".cads-icon_close"
  end
end
