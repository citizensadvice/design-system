# frozen_string_literal: true

require "dotenv"
Dotenv.load(".env")

require "capybara"
require "capybara/dsl"
require "capybara/cucumber"
require "rspec"
require "selenium-webdriver"
require "site_prism"
require "webdrivers"

require_relative "driver"
require_relative "components/all"
require_relative "forms/all"

World(Capybara::RSpecMatcherProxies)

Driver.new.register

Selenium::WebDriver.logger.io.binmode
