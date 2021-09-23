# frozen_string_literal: true

module Drivers
  class Browserstack
    class PayloadValuesGenerator
      class << self
        include Helpers::EnvVariables
        include Helpers::Methods

        def build_name
          if deployed_branch?
            "Public Website - Job Ref: #{job_ref} - SHA: #{sha} - URL: #{base_url}"
          elsif pr?
            "Public Website - Job Ref: #{job_ref} - URL: #{base_url}"
          elsif local_run?
            "Public Website - Local Machine run - Month: #{Time.now.utc.month}"
          else
            AutomationLogger.error("DOCKER TAG: #{docker_tag}.")
            raise "Incorrect configuration of ENV parameters for Browserstack execution."
          end
        end

        def session_name
          if pr? || deployed_branch?
            "Build: #{build_number} - CALLING_PROJECT: #{calling_project}"
          else
            "Local run: Ran at #{timestamp}"
          end
        end

        private

        def deployed_branch?
          docker_tag && deployed_branches.include?(job_ref)
        end

        def pr?
          docker_tag && job_ref.start_with?("PR")
        end

        def local_run?
          no_downstream_project? && !docker_tag
        end

        # Example: develop (Branch)
        # Example: PR-847 (PR)
        def job_ref
          @job_ref ||= identifier_parts[0..-2].join
        end

        def build_number
          build_and_sha.first
        end

        def sha
          build_and_sha.last
        end

        # Example: ["769", "e1bc5c8"] (Branch)
        # Example: ["4", "03d547a"] (PR)
        def build_and_sha
          identifier_parts.last.split("_")
        end

        # Example: ["develop", "769_e1bc5c8"] (Branch)
        # Example: ["PR", "847", "4_03d547a"] (PR)
        def identifier_parts
          @identifier_parts ||= identifier.split("-")
        end

        # Example: develop-769_e1bc5c8 (Branch)
        # Example: PR-847-4_03d547a (PR)
        def identifier
          docker_tag.split("public-website-").last
        end

        # These need revisiting as they are not fully up to date
        # NB: When fixing these. Also fix Jenkinsfile, and other locations
        #
        # LH - Feb 2021
        def deployed_branches
          %w[develop qa demo master main]
        end
      end
    end
  end
end
