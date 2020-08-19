# frozen_string_literal: true

class Header < SitePrism::Section
  element :search_field, 'input[name="q"]'
  element :search_button, ".cads-search button"
  element :login_link, ".cads-header-account-panel [href*='login']"

  def login_as(user_category)
    raise ArgumentError, "Invalid user_category" unless valid?(user_category)

    login_link.click
    AutomationLogger.info("Old style login page loaded. Not yet in-scope")
    LegacyLogin.new.login
  end

  private

  def valid?(user_category)
    valid_user_categories.include?(user_category)
  end

  def valid_user_categories
    %i[
      adviser
      visitor
    ]
  end
end
