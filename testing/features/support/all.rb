# frozen_string_literal: true

require "capybara"
require "capybara/dsl"
require "capybara/cucumber"
require "forwardable"
require "logger"
require "rspec"
require "selenium-webdriver"
require "singleton"
require "site_prism"
require "webdrivers"

# Patches need to be required last after everything else defined
require "active_support/core_ext/object/blank"
