# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Footer, type: :component do
  subject { page }

  let(:year) { Date.current.year }

  describe "common elements" do
    before { render_inline described_class.new }

    it { is_expected.to have_css ".cads-logo" }
    it { is_expected.to have_text "Copyright ©#{year} Citizens Advice" }
    it { is_expected.to have_text "Citizens Advice is an operating name of" }
    it { is_expected.to have_no_css "nav" }

    context "when welsh language" do
      around { |example| I18n.with_locale(:cy) { example.run } }

      it { is_expected.to have_text "Hawlfraint ©#{year} Cyngor ar Bopeth" }
      it { is_expected.to have_text "Cyngor ar Bopeth yn enw gweithredol ar" }
    end
  end

  describe "custom legal summary valid" do
    before do
      render_inline(described_class.new) do |c|
        c.with_legal_summary("Legal summary custom text")
      end
    end

    it { is_expected.to have_css "[data-testid='legal-summary']", text: "Legal summary custom text" }
  end

  describe "custom legal summary whitespace" do
    before do
      render_inline(described_class.new) do |c|
        c.with_legal_summary(" ")
      end
    end

    it { is_expected.to have_css "[data-testid='legal-summary']", text: "1 Easton Street" }
  end

  describe "custom legal summary empty" do
    before do
      render_inline(described_class.new) do |c|
        c.with_legal_summary("")
      end
    end

    it { is_expected.to have_css "[data-testid='legal-summary']", text: "1 Easton Street" }
  end

  describe "fallback legal summary" do
    before do
      render_inline(described_class.new)
    end

    it { is_expected.to have_css "[data-testid='legal-summary']", text: "1 Easton Street" }
  end

  describe "columns" do
    before do
      render_inline(described_class.new) do |c|
        c.with_columns(columns)
      end
    end

    let(:columns) { generate_columns(3) }

    it { is_expected.to have_css "[data-testid='footer-column']", count: 3 }
    it { is_expected.to have_css "h2", text: "Example column 1" }
    it { is_expected.to have_css "h2", text: "Example column 2" }
    it { is_expected.to have_css "h2", text: "Example column 3" }
    it { is_expected.to have_css "[data-testid='footer-column']:first-of-type a", count: 3 }

    context "when number of columns exceeds limit" do
      let(:columns) { generate_columns(6) }

      it "has number of columns limited to maximum" do
        expect(page).to have_css "[data-testid='footer-column']", count: 4
      end
    end
  end

  describe "feedback_link" do
    let(:default_text) { "Is there anything wrong" }

    context "with url only" do
      before do
        render_inline(described_class.new) do |c|
          c.with_feedback_link(url: "https://example.com/")
        end
      end

      it { is_expected.to have_link default_text, href: "https://example.com/" }
      it { is_expected.to have_no_css "[target=_blank]", text: default_text }
    end

    context "with custom title" do
      before do
        render_inline(described_class.new) do |c|
          c.with_feedback_link(title: "Custom link title", url: "https://example.com/", new_tab: true)
        end
      end

      it { is_expected.to have_link "Custom link title", href: "https://example.com/" }
      it { is_expected.to have_css "a[aria-label='Custom link title (opens in a new tab)']" }
    end

    context "with new_tab set to true" do
      before do
        render_inline(described_class.new) do |c|
          c.with_feedback_link(url: "https://example.com/", new_tab: true)
        end
      end

      it { is_expected.to have_css "[target=_blank]", text: default_text }
      it { is_expected.to have_css "[rel=noopener]" }
      it { is_expected.to have_css "a[aria-label='Is there anything wrong with this page? Let us know (opens in a new tab)']" }
    end

    context "with URI builder object" do
      before do
        render_inline(described_class.new) do |c|
          c.with_feedback_link(url: URI::HTTPS.build(host: "example.com", path: "/example-path"))
        end
      end

      it { is_expected.to have_link "Is there anything wrong", href: "https://example.com/example-path" }
    end
  end

  private

  def generate_columns(count)
    count.times.each_with_index.map do |_, index|
      {
        title: "Example column #{index + 1}",
        links: [
          { url: "#", title: "Link 1" },
          { url: "#", title: "Link 2" },
          { url: "#", title: "Link 3" }
        ]
      }
    end
  end
end
