# frozen_string_literal: true

module CitizensAdviceComponents
  class AssetHyperlinkComponentPreview < ViewComponent::Preview
    def example
      render(
        CitizensAdviceComponents::AssetHyperlinkComponent.new(
          href: "https://example.com",
          description: "Test PDF",
          size: 6_444_516
        )
      )
    end
  end
end
