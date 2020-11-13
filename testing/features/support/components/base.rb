# frozen_string_literal: true

class Base < SitePrism::Page
  element :root, "#root"

  load_validation do
    AutomationLogger.debug("Waiting for #{self.class} component.")
    [validate_initial_state!, "Initial #{self.class} component didn't load correctly!"]
  end

  def switch_language(language)
    return if I18n.locale == language

    visit(page.current_url + "&locale=#{language}")
    I18n.locale = language
  end

  def validate_initial_state!
    has_root?(wait: 5) && !text.empty?
  end
end
