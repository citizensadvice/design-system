# frozen_string_literal: true

module Drivers
  class Browserstack
    class PayloadValuesGenerator
      class << self
        include Helpers::EnvVariables
        include Helpers::Methods

        def build_name
          if master?
            "Design System - #{pr_sha_reference} - URL: #{base_url}"
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
          docker_tag&.include?("master")
        end

        def branch?
          docker_tag&.include?("PR-")
        end

        # Example: PR-284
        def pr_without_build_iteration
          pr_sha_reference.split("_").first
        end

        def build_iteration
          pr_sha_reference.split("_").last
        end

        # Example: master_ad4b223
        # Example: PR-284_dbbb8b6
        def pr_sha_reference
          @pr_sha_reference ||= docker_tag.split("design-system/").last
        end
      end
    end
  end
end
