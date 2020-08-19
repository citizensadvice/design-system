# frozen_string_literal: true

module Helpers
  module Methods
    def timestamp
      Time.now.strftime("%Y-%m-%d-%H-%M-%S")
    end

    def current_session
      Capybara.current_session
    end

    def uk_registered_office
      "Registered office: Citizens Advice, 3rd Floor North, 200 Aldersgate, London, EC1A 4HD"
    end
  end
end
