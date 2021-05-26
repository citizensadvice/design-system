# frozen_string_literal: true

module ErrorSummary
  class Example < ::Base
    set_url "/iframe.html?id=forms-error-summary--example&viewMode=story"

    element :heading, "#error-summary-title"
    elements :errors, "ul > li"
  end
end
