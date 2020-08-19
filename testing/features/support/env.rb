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
require_relative "support/helpers/ables"
require_relative "support/helpers/design_system"
require_relative "support/helpers/faraday"
require_relative "support/helpers/drivers"
require_relative "support/helpers/methods"
require_relative "support/helpers/page"

require_relative "automation_logger"

require_relative "support/core_ext/string"

require_relative "driver"
require_relative "support/drivers/local"
require_relative "support/drivers/remote"
require_relative "support/drivers/browserstack"
require_relative "support/drivers/browserstack/base"
require_relative "support/drivers/browserstack/android"
require_relative "support/drivers/browserstack/chrome"
require_relative "support/drivers/browserstack/internet_explorer"
require_relative "support/drivers/browserstack/ios"

# To prevent SitePrism class load conflicts
require_relative "support/sections/footer"
require_relative "support/sections/header"
require_relative "support/sections/navigation"

World(
  Helpers::EnvVariables,
  Helpers::Page,
  Helpers::Methods,
  Helpers::DesignSystem,
  Capybara::RSpecMatcherProxies
)

SitePrism.configure do |config|
  config.log_path = "tmp/logs/site_prism.log"
  config.log_level = :INFO

  # This will be required until v4 of SitePrism is released
  require "site_prism/all_there"
  config.use_all_there_gem = true
end

Selenium::WebDriver.logger.level = :INFO
Selenium::WebDriver.logger.output = "tmp/logs/webdriver.log"

Driver.new.register
