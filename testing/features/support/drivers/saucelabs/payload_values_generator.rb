# frozen_string_literal: true

module Drivers
  class Saucelabs
    class PayloadValuesGenerator
      class << self
        include Helpers::EnvVariables

        def build_name
          "Design System - #{identifier} - #{base_url}"
        end

        def identifier
          browserstack_build_name || "Local machine run #{Time.now.month}"
        end

        def session_name
          "SHA: #{sha}"
        end

        private

        def sha
          `git rev-parse --short HEAD`.chomp
        end
      end
    end
  end
end
