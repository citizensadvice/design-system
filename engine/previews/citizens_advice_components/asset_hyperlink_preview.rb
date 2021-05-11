# frozen_string_literal: true

module CitizensAdviceComponents
  class AssetHyperlinkPreview < ViewComponent::Preview
    def example
      render(
        CitizensAdviceComponents::AssetHyperlink.new(
          href: "https://example.com",
          description: "Test PDF",
          size: 6_444_516
        )
      )
    end
  end
end
