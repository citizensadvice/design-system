# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::AssetHyperlink, type: :component do
  subject(:component) do
    render_inline(
      described_class.new(
        href: "https://example.com",
        description: "Test PDF",
        size: 6_444_516
      )
    )
  end

  it "renders link with text" do
    expect(component.at("a").text.strip.strip.tr("\n", " ")).to eq "Test PDF  6.15 MB"
  end
end
