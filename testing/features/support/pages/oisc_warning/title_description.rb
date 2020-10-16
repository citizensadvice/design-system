# frozen_string_literal: true

module OISCWarning
  class TitleDescription < SitePrism::Page
    set_url "/iframe.html?id=components-oisc-warning--with-title-and-description"

    element :heading, "h2"
    element :description, "p"

    load_validation do
      AutomationLogger.debug("Waiting for OISC Warning component.")
      [has_heading?(wait: 5), "Initial OISC Warning component didn't load correctly!"]
    end
  end
end
