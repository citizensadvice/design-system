# frozen_string_literal: true

require "dotenv"
Dotenv.load(".env")

require_relative "all"
require_relative "helpers/all"
require_relative "automation_logger"
require_relative "core_ext/string"
require_relative "driver"
require_relative "drivers/all"
require_relative "components/all"

World(
  Helpers::Page,
  Helpers::Methods,
  Helpers::Regex,
  Capybara::RSpecMatcherProxies
)

Driver.new.register
