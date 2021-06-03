# frozen_string_literal: true

# FetchOrFallbackHelper
# Minimal version of https://github.com/primer/view_components/blob/main/app/lib/primer/fetch_or_fallback_helper.rb
# A little helper to enable graceful fallbacks
#
# Use this helper to quietly ensure a value is
# one that you expect:
#
# allowed_values    - allowed options for *value*
# given_value       - input being coerced
# fallback          - returned if *given_value* is not included in *allowed_values*
#
# fetch_or_fallback([1,2,3], 5, 2) => 2
# fetch_or_fallback([1,2,3], 1, 2) => 1
# fetch_or_fallback([1,2,3], nil, 2) => 2
module CitizensAdviceComponents
  module FetchOrFallbackHelper
    InvalidValueError = Class.new(StandardError)

    def fetch_or_fallback(allowed_values:, given_value:, fallback: nil) # rubocop:disable Metrics/MethodLength
      if allowed_values.include?(given_value)
        given_value
      else
        unless Rails.env.production?
          raise InvalidValueError, <<~MSG
            fetch_or_fallback was called with an invalid value.

            Expected one of: #{allowed_values.inspect}
            Got: #{given_value.inspect}

            This will not raise in production, but will instead fallback to: #{fallback.inspect}
          MSG
        end

        fallback
      end
    end

    def fetch_or_fallback_boolean(given_value, fallback: false)
      if [true, false].include?(given_value)
        given_value
      else
        fallback
      end
    end
  end
end
