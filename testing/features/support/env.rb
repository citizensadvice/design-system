# frozen_string_literal: true

require "dotenv"
Dotenv.load(".env")

require "singleton"
require "forwardable"
require "logger"

require "capybara"
require "capybara/dsl"
require "capybara/cucumber"
require "faraday"
require "rspec"
require "selenium-webdriver"
require "site_prism"
require "webdrivers"

# To prevent natural cucumber load order
require_relative "helpers/env_variables"
require_relative "helpers/drivers"
require_relative "helpers/faraday"
require_relative "helpers/methods"
require_relative "helpers/page"
require_relative "helpers/regex"

require_relative "automation_logger"

require_relative "core_ext/string"

require_relative "driver"
require_relative "drivers/local"
require_relative "drivers/remote"
require_relative "drivers/browserstack"
require_relative "drivers/browserstack/base"
require_relative "drivers/browserstack/android"
require_relative "drivers/browserstack/chrome"
require_relative "drivers/browserstack/internet_explorer"
require_relative "drivers/browserstack/ios"

World(
  Helpers::Page,
  Helpers::Methods,
  Helpers::Regex,
  Capybara::RSpecMatcherProxies
)

SitePrism.configure do |config|
  config.log_path = "artifacts/logs/site_prism.log"
  config.log_level = :INFO

  # This will be required until v4 of SitePrism is released
  require "site_prism/all_there"
  config.use_all_there_gem = true
end

Selenium::WebDriver.logger.level = :INFO
Selenium::WebDriver.logger.output = "artifacts/logs/webdriver.log"

Driver.new.register
