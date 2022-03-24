# frozen_string_literal: true

class Driver
  def initialize
    setup_capybara
  end

  def register
    Capybara.register_driver :selenium do |app|
      Capybara::Selenium::Driver.new(
        app,
        browser: :chrome,
        capabilities: capabilities
      )
    end
  end

  private

  def capabilities
    options = Selenium::WebDriver::Chrome::Options.new
    options.add_argument("--headless") if headless?
    options
  end

  def setup_capybara
    Capybara.configure do |config|
      config.run_server = false
      config.default_driver = :selenium
      config.default_max_wait_time = 0
      config.app_host = base_url
    end
  end

  def headless?
    ENV.fetch("HEADLESS", "true") == "true"
  end

  def base_url
    ENV.fetch("TESTING_BASE_URL")
  end
end
