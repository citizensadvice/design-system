# frozen_string_literal: true

module Drivers
  class Browserstack
    class PayloadValuesGenerator
      class << self
        include Helpers::EnvVariables
        include Helpers::Methods

        def build_name
          "Design System - #{identifier} - #{base_url}"
        end

        def session_name
          "SHA: #{sha} - CALLING_PROJECT: design-system"
        end

        private

        def identifier
          browserstack_build_name.present? ? browserstack_build_name : sha
        end

        def sha
          @sha ||= `git rev-parse --short HEAD`.chomp
        end
      end
    end
  end
end
