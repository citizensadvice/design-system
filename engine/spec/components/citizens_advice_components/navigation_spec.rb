# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Navigation, type: :component do
  subject { page }

  context "when links are provided" do
    before do
      render_inline described_class.new(
        links: [
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
      )
    end

    it { is_expected.to have_selector ".cads-navigation" }
    it { is_expected.to have_selector "a", count: 10 }
    it { is_expected.to have_link "Benefits", href: "/benefits/" }
    it { is_expected.to have_link "Work", href: "/work/" }
  end

  context "when no links" do
    before do
      render_inline described_class.new(links: nil)
    end

    it { is_expected.to have_no_selector ".cads-navigation" }
  end
end
