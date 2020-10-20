# frozen_string_literal: true

class Base < SitePrism::Page
  load_validation do
    AutomationLogger.debug("Waiting for #{self.class} component.")
    [validate_initial_state!, "Initial #{self.class} component didn't load correctly!"]
  end
end
