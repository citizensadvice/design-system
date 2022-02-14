# frozen_string_literal: true

require "dotenv"
Dotenv.load(".env")

require_relative "all"
require_relative "helpers/all"
require_relative "automation_logger"
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

CaTesting.logger.level = :DEBUG
CaTesting::Patches::Capybara.new.patch!
CaTesting::Patches::SeleniumLogger.new.patch!
CaTesting::Patches::SeleniumManager.new.patch!
CaTesting::Patches::SeleniumOptions.new(ENV["BROWSER"].to_sym).patch!
