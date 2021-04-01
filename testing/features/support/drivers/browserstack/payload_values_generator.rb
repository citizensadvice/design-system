# frozen_string_literal: true

module Drivers
  class Browserstack
    class PayloadValuesGenerator
      class << self
        include Helpers::EnvVariables
        include Helpers::Methods

        def build_name
          if browserstack_build_name.present?
            "Design System - #{browserstack_build_name} - #{base_url}"
          else
            "Design System - #{sha} - #{base_url}"
          end
        end

        def session_name
          "SHA: #{sha} - CALLING_PROJECT: design-system"
        end

        private

        def sha
          @sha ||= `git rev-parse --short HEAD`.chomp
        end
      end
    end
  end
end
