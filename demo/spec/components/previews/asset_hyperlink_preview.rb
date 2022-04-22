# frozen_string_literal: true

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
