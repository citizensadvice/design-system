# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::AssetHyperlink, type: :component do
  subject(:component) do
    described_class.new(
      href: "https://example.com",
      description: "Test PDF",
      size: 6_444_516
    )
  end

  it "renders link with text" do
    render_inline component
    expect(page).to have_link "Test PDF 6.15 MB"
  end
end
