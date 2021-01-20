# frozen_string_literal: true

RSpec.describe DesignSystem::AssetHyperlinkComponent do
  subject(:component) do
    render_inline(
      DesignSystem::AssetHyperlinkComponent.new(
        uri: "https://example.com",
        description: "Test PDF",
        size: 6_444_516
      )
    )
  end

  it "renders link with text" do
    expect(component.at("a").text.strip.strip.tr("\n", " ")).to eq "Test PDF  6.15 MB"
  end
end
