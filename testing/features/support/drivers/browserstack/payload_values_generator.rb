# frozen_string_literal: true

module Drivers
  class Browserstack
    class PayloadValuesGenerator
      class << self
        include Helpers::EnvVariables
        include Helpers::Methods

        def build_name
          if master?
            "Design System - #{pr_with_build_iteration} - URL: #{base_url}"
          elsif branch?
            "Design System - #{pr_without_build_iteration} - URL: #{base_url}"
          else
            "Local Machine run - Month #{Time.now.month} - Ignore results!"
          end
        end

        def session_name
          if branch? || master?
            "Build: #{build_iteration} - CALLING_PROJECT: design-system"
          else
            "Local run: Ran at #{timestamp}"
          end
        end

        private

        def master?
          docker_tag.include?("master")
        end

        def branch?
          docker_tag.include?("PR-")
        end

        # Example: PR-81
        def pr_without_build_iteration
          pr_sha_reference.split(/-\d+_/).first
        end

        def build_iteration
          pr_with_build_iteration.split("-").last
        end

        # Example: PR-81-1
        def pr_with_build_iteration
          pr_sha_reference.split("_").first
        end

        # Example: PR-81-1_98eb207
        def pr_sha_reference
          @pr_sha_reference ||= docker_tag.split("design-system-").last
        end
      end
    end
  end
end
