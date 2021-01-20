# frozen_string_literal: true

module DesignSystem
  class CalloutComponentPreview < ViewComponent::Preview
    def standard
      render(
        DesignSystem::CalloutComponent.new(
          type: "standard",
          body: "<h2>Callout title</h2><p>Some example text</p>"
        )
      )
    end

    def example
      render(
        DesignSystem::CalloutComponent.new(
          type: "example",
          body: "<h2>Callout title</h2><p>Some example text</p>"
        )
      )
    end

    def important
      render(
        DesignSystem::CalloutComponent.new(
          type: "important",
          body: "<h2>Callout title</h2><p>Some example text</p>"
        )
      )
    end

    def adviser
      render(
        DesignSystem::CalloutComponent.new(
          type: "adviser",
          body: "<h2>Callout title</h2><p>Some example text</p>"
        )
      )
    end
  end
end
