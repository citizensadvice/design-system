# frozen_string_literal: true

require "dotenv"
Dotenv.load(".env")

require_relative "all"
require_relative "helpers/all"
require_relative "automation_logger"
require_relative "core_ext/string"
require_relative "driver"
require_relative "drivers/all"

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
