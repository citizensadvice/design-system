# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::OnThisPage, type: :component do
  subject { page }

  context "when no links present" do
    before { render_inline described_class.new }

    it { is_expected.not_to have_selector ".cads-on-this-page" }
  end

  context "when there are links present" do
    before do
      render_inline described_class.new do |c|
        c.links([
          { label: "Link 1", id: "link-1" },
          { label: "Link 2", id: "link-2" },
          { label: "Link 3", id: "link-3" },
          { label: "Link 4", id: "link-4" }
        ])
      end
    end

    it { is_expected.to have_selector "a", count: "4" }
    it { is_expected.to have_link "Link 1", href: "#link-1" }
    it { is_expected.to have_link "Link 2", href: "#link-2" }
    it { is_expected.to have_link "Link 3", href: "#link-3" }
    it { is_expected.to have_link "Link 4", href: "#link-4" }

    it "does not render toggle buttons" do
      expect(page).not_to have_selector "[data-testid='on-this-page-toggle']"
    end

    it "does not render nested links" do
      expect(page).not_to have_selector "[data-testid='on-this-page-children']"
    end
  end

  describe "nested links" do
    context "when there are only top-level links present" do
      before do
        render_inline described_class.new(show_nested_links: true) do |c|
          c.links([
            { label: "Link 1", id: "link-1" },
            { label: "Link 2", id: "link-2" },
            { label: "Link 3", id: "link-3" },
            { label: "Link 4", id: "link-4" }
          ])
        end
      end

      it "does not render toggle buttons" do
        expect(page).not_to have_selector "[data-testid='on-this-page-toggle']"
      end

      it "does not render nested links" do
        expect(page).not_to have_selector "[data-testid='on-this-page-children']"
      end
    end

    context "when there are nested links present" do
      before do
        render_inline described_class.new(show_nested_links: true) do |c|
          c.links([
            { label: "Link 1", id: "link-1" },
            { label: "Link 2", id: "link-2", children: [
              { label: "Link 2.1", id: "link-2-1" },
              { label: "Link 2.2", id: "link-2-2" }
            ] },
            { label: "Link 3", id: "link-3" },
            { label: "Link 4", id: "link-4", children: [
              { label: "Link 4.1", id: "link-4-1" }
            ] },
            { label: "Link 5", id: "link-5" }
          ])
        end
      end

      it { is_expected.to have_link "Link 1", href: "#link-1" }
      it { is_expected.to have_link "Link 2", href: "#link-2" }
      it { is_expected.to have_link "Link 2.1", href: "#link-2-1" }
      it { is_expected.to have_link "Link 2.2", href: "#link-2-2" }
      it { is_expected.to have_link "Link 3", href: "#link-3" }
      it { is_expected.to have_link "Link 4", href: "#link-4" }
      it { is_expected.to have_link "Link 4.1", href: "#link-4-1" }
      it { is_expected.to have_link "Link 5", href: "#link-5" }

      it "renders the correct number of toggle buttons" do
        expect(page).to have_selector "[data-testid='on-this-page-toggle']", count: 2
      end
    end
  end
end
