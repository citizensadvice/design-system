# frozen_string_literal: true

class Base < SitePrism::Page
  element :root, "#root"

  load_validation do
    [validate_initial_state!, "Initial #{self.class} component didn't load correctly!"]
  end

  def validate_initial_state!
    has_root?(wait: 5) && !text.empty?
  end
end
