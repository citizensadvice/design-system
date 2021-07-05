# frozen_string_literal: true

# Disable default routes, reconfigured in routes.rb with locale scope
# https://github.com/thoughtbot/high_voltage#localization
HighVoltage.configure do |config|
  config.routes = false
end
