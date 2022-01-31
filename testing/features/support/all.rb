# frozen_string_literal: true

require "capybara"
require "capybara/dsl"
require "capybara/cucumber"
require "faraday"
require "forwardable"
require "logger"
require "retriable"
require "rspec"
require "sauce_whisk"
require "selenium-webdriver"
require "singleton"
require "site_prism"
require "webdrivers"

# Patches need to be required last after everything else defined
require "active_support/core_ext/object/blank"
require "ca_testing"
