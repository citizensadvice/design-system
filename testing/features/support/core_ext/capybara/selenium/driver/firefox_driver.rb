# frozen_string_literal: true

# This patch completely overwrites one extension method of Firefox driver specialisation
# The issue is the chromedriver specialisation re-publicises the `commands` method on bridge.
#
# As this isn't public here. We need to `send` it. To bypass security. See:
# https://github.com/teamcapybara/capybara/issues/2380
# for more details/discussion including possible other fixes.
#
# LH - Sep 2020
module Capybara::Selenium::Driver::FirefoxDriver # rubocop:disable Style/ClassAndModuleChildren
  def self.extended(driver)
    driver.extend Capybara::Selenium::Driver::W3CFirefoxDriver if w3c?(driver)
    bridge = driver.send(:bridge)
    bridge.extend Capybara::Selenium::IsDisplayed unless bridge.send(:commands, :is_element_displayed)
  end
end
