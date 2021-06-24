# frozen_string_literal: true

module Helpers
  module Methods
    def timestamp
      Time.now.strftime("%Y-%m-%d-%H-%M-%S")
    end

    def current_session
      Capybara.current_session
    end
  end
end
