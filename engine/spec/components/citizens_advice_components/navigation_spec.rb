# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Navigation, type: :component do
  subject(:component) do
    render_inline(described_class.new(links: links))
  end

  let(:links) do
    [
      { url: "/benefits/", title: "Benefits" },
      { url: "/work/", title: "Work" },
      { url: "/debt-and-money/", title: "Debt and money" },
      { url: "/consumer/", title: "Consumer" },
      { url: "/housing/", title: "Housing" },
      { url: "/family/", title: "Family" },
      { url: "/law-and-courts/", title: "Law and courts" },
      { url: "/immigration/", title: "Immigration" },
      { url: "/health/", title: "Health" },
      { url: "/more", title: "More from us" }
    ]
  end

  it "renders navigation" do
    result = component.css("a").map { |item| { title: item.text.strip, url: item.attr("href") } }
    expect(result).to eq links
  end

  context "when no links" do
    let(:links) { nil }

    it "does not render" do
      expect(component.at(".cads-navigation")).not_to be_present
    end
  end
end
