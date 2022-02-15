# frozen_string_literal: true

module ContactDetails
  class Example < ::Base
    set_url "/iframe.html?id=components-disclosure--example&args=&viewMode=story"

    element :toggle_button, "[data-label-when-hiding='View template letter']"
    element :details, "[id$='disclosure-details']"
  end
end
