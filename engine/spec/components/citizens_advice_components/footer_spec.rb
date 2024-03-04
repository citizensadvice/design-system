# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Footer, type: :component do
  subject { page }

  let(:year) { Date.current.year }

  describe "common elements" do
    before { render_inline described_class.new }

    it { is_expected.to have_selector ".cads-logo" }
    it { is_expected.to have_text "Copyright ©#{year} Citizens Advice" }
    it { is_expected.to have_text "Citizens Advice is an operating name of" }
    it { is_expected.not_to have_selector "nav" }

    context "when welsh language" do
      around { |example| I18n.with_locale(:cy) { example.run } }

      it { is_expected.to have_text "Hawlfraint ©#{year} Cyngor ar Bopeth" }
      it { is_expected.to have_text "Cyngor ar Bopeth yn enw gweithredol ar" }
    end
  end

  describe "custom legal summary valid" do
    before do
      travel_to fake_date
      render_inline(described_class.new) do |c|
        c.with_legal_summary("Legal summary custom text")
      end
    end

    context "when before the office move" do
      let(:fake_date) { Date.new(2024, 2, 28) }

      it { is_expected.to have_selector "[data-testid='legal-summary']", text: "Legal summary custom text" }
    end

    context "when after the office move" do
      let(:fake_date) { Date.new(2024, 3, 15) }

      it { is_expected.to have_selector "[data-testid='legal-summary']", text: "Legal summary custom text" }
    end
  end

  describe "custom legal summary whitespace" do
    before do
      travel_to fake_date
      render_inline(described_class.new) do |c|
        c.with_legal_summary(" ")
      end
    end

    context "when before the office move" do
      let(:fake_date) { Date.new(2024, 2, 28) }

      it { is_expected.to have_selector "[data-testid='legal-summary']", text: "200 Aldersgate" }
    end

    context "when after the office move" do
      let(:fake_date) { Date.new(2024, 3, 15) }

      it { is_expected.to have_selector "[data-testid='legal-summary']", text: "1 Easton Street" }
    end
  end

  describe "custom legal summary empty" do
    before do
      travel_to fake_date
      render_inline(described_class.new) do |c|
        c.with_legal_summary("")
      end
    end

    context "when before the office move" do
      let(:fake_date) { Date.new(2024, 2, 28) }

      it { is_expected.to have_selector "[data-testid='legal-summary']", text: "200 Aldersgate" }
    end

    context "when after the office move" do
      let(:fake_date) { Date.new(2024, 3, 15) }

      it { is_expected.to have_selector "[data-testid='legal-summary']", text: "1 Easton Street" }
    end
  end

  describe "fallback legal summary" do
    before do
      travel_to fake_date
      render_inline(described_class.new)
    end

    context "when before the office move" do
      let(:fake_date) { Date.new(2024, 2, 28) }

      it { is_expected.to have_selector "[data-testid='legal-summary']", text: "200 Aldersgate" }
    end

    context "when after the office move" do
      let(:fake_date) { Date.new(2024, 3, 15) }

      it { is_expected.to have_selector "[data-testid='legal-summary']", text: "1 Easton Street" }
    end
  end

  describe "columns" do
    before do
      allow(CitizensAdviceComponents.deprecator).to receive(:warn)

      render_inline(described_class.new) do |c|
        c.with_columns(columns)
      end
    end

    let(:columns) { generate_columns(3) }

    it { is_expected.to have_selector "[data-testid='footer-column']", count: 3 }
    it { is_expected.to have_selector "h2", text: "Example column 1" }
    it { is_expected.to have_selector "h2", text: "Example column 2" }
    it { is_expected.to have_selector "h2", text: "Example column 3" }
    it { is_expected.to have_selector "[data-testid='footer-column']:first-of-type a", count: 3 }

    context "when number of columns exceeds limit" do
      let(:columns) { generate_columns(6) }

      it "has number of columns limited to maximum" do
        expect(page).to have_selector "[data-testid='footer-column']", count: 4
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
      it { is_expected.not_to have_selector "[target=_blank]", text: default_text }
    end

    context "with custom title" do
      before do
        render_inline(described_class.new) do |c|
          c.with_feedback_link(title: "Custom link title", url: "https://example.com/")
        end
      end

      it { is_expected.to have_link "Custom link title", href: "https://example.com/" }
    end

    context "with new_tab set to true" do
      before do
        render_inline(described_class.new) do |c|
          c.with_feedback_link(url: "https://example.com/", new_tab: true)
        end
      end

      it { is_expected.to have_selector "[target=_blank]", text: default_text }
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

  describe "deprecated feedback_url" do
    before do
      allow(CitizensAdviceComponents.deprecator).to receive(:warn)

      render_inline(described_class.new(feedback_url: "https://example.com/"))
    end

    it { is_expected.to have_link "Is there anything wrong", href: "https://example.com/" }

    it "logs deprecation warning" do
      expect(CitizensAdviceComponents.deprecator).to have_received(:warn)
        .with(/feedback_url argument is deprecated/)
    end

    it "allows passing a URI builder object" do
      render_inline(described_class.new(feedback_url: URI::HTTPS.build(host: "example.com", path: "/example-path")))

      expect(page).to have_link "Is there anything wrong", href: "https://example.com/example-path"
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
