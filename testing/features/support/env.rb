# frozen_string_literal: true

require "dotenv"
Dotenv.load(".env")

require_relative "all"
require_relative "helpers/all"
require_relative "driver"
require_relative "components/all"
require_relative "forms/all"

World(
  Helpers::BrowserWindow,
  Helpers::EnvVariables,
  Helpers::Regex,
  Capybara::RSpecMatcherProxies
)

Driver.new.register

Selenium::WebDriver.logger.io.binmode
