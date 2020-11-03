# frozen_string_literal: true

module Selenium
  module WebDriver
    module Firefox
      class Options < WebDriver::Options
        private

        def generate_as_json(value, camelize_keys: true)
          if value.is_a?(Hash)
            value.each_with_object({}) do |(key, val), hash|
              key = convert_json_key(key, camelize: camelize_keys)
              hash[key] = generate_as_json(val, camelize_keys: key != 'prefs')
            end
          else
            super
          end
        end
      end
    end
  end
end
