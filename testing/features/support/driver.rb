# frozen_string_literal: true

class Driver
  include Helpers::EnvVariables

  def initialize
    setup_capybara
  end

  def register
    if grid?
      Drivers::Remote.new.register
    elsif browserstack?
      register_browserstack_driver
    else
      Drivers::Local.new.register
    end
  end

  private

  def setup_capybara
    Capybara.configure do |config|
      config.run_server = false
      config.default_driver = :selenium
      config.default_max_wait_time = 0
      config.app_host = base_url
      config.default_normalize_ws = true if safari?
    end
  end

  def register_browserstack_driver
    Drivers::Browserstack.new.register
  end
end
