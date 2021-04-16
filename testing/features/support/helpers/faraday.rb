# frozen_string_literal: true

module Helpers
  module Faraday
    include Helpers::EnvVariables

    def update_browserstack_status
      cucumber_results_connection.put do |request|
        request.headers["Content-Type"] = "application/json"
        request.body = { status: status }.to_json
      end
    end

    private

    def cucumber_results_connection
      @cucumber_results_connection ||= begin
        ::Faraday.new(url: "https://api.browserstack.com/automate/sessions/#{id}.json").tap do |connection|
          connection.basic_auth(browserstack_username, browserstack_api_key)
        end
      end
    end

    def id
      ::CucumberInfo.session_id
    end

    def status
      ::CucumberInfo.scenario_result
    end
  end
end
