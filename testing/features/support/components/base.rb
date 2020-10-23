# frozen_string_literal: true

class Base < SitePrism::Page
  load_validation do
    AutomationLogger.debug("Waiting for #{self.class} component.")
    [validate_initial_state!, "Initial #{self.class} component didn't load correctly!"]
  end

  def switch_language(_language)
    "TBD"
  end

  def validate_initial_state!
    has_initial_form?(wait: 5)
  end
end
