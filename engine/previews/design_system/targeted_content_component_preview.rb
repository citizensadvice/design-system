# frozen_string_literal: true

module DesignSystem
  class TargetedContentComponentPreview < ViewComponent::Preview
    def default
      render(
        DesignSystem::TargetedContentComponent.new(
          id: "example-id",
          title: "Targeted content title",
          body: "<p>Some example text</p>"
        )
      )
    end

    def fallback
      render(
        DesignSystem::TargetedContentComponent.new(
          id: "example-id",
          title: "Targeted content title",
          body: "<p>Some example text</p>",
          is_toggleable: false
        )
      )
    end
  end
end
