# frozen_string_literal: true

module Disclosure
  class Example < ::Base
    set_url "/iframe.html?id=components-disclosure--example&args=&viewMode=story"

    element :toggle, ".cads-disclosure__toggle"
    element :details, ".cads-disclosure__details"
  end
end
