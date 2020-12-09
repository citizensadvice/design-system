# frozen_string_literal: true

require "ca_testing"
require "capybara"
require "capybara/dsl"
require "capybara/cucumber"
require "faraday"
require "forwardable"
require "i18n"
require "logger"
require "retriable"
require "rspec"
require "selenium-webdriver"
require "singleton"
require "site_prism"
require "webdrivers"

I18n.load_path += Dir["../locales/*.yml"]
