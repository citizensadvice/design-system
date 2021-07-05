# frozen_string_literal: true

module SuccessMessage
  class Example < ::Base
    set_url "/iframe.html?id=forms-success-message--example&args=&viewMode=story"

    element :feedback, "p", text: "Thank you for your feedback"
  end
end
