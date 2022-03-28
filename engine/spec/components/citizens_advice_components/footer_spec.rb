# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Footer, type: :component do
  subject(:component) do
    render_inline(described_class.new(feedback_url: feedback_url)) do |c|
      c.columns(columns)
    end
  end

  let(:columns) { generate_columns(4) }
  let(:feedback_url) { "https://www.research.net/r/J8PLH2H" }

  before do
    travel_to Time.zone.local(2049)
  end

  describe "feedback URL" do
    subject { component.at("a[href='#{feedback_url}']") }

    it { is_expected.to be_present }
  end

  describe "columns" do
    subject(:footer_columns) { component.css("[data-testid='footer-column']") }

    let(:columns) { generate_columns(3) }

    it "has expected number of columns" do
      expect(footer_columns.size).to eq 3
    end

    it "has expected headings" do
      expect(footer_columns.css("h2").map { |item| item.text.strip }).to eq [
        "Example column 1",
        "Example column 2",
        "Example column 3"
      ]
    end

    it "has expected number of links" do
      expect(footer_columns.first.css("a").size).to eq 3
    end

    context "when number of columns exceeds limit" do
      let(:columns) { generate_columns(6) }

      it "has number of columns limited to maximum" do
        expect(footer_columns.size).to eq 4
      end
    end
  end

  describe "logo" do
    subject { component.at(".cads-logo") }

    it { is_expected.to be_present }
  end

  describe "copyright notice" do
    subject { component.at("[data-testid='copyright']").text }

    it { is_expected.to start_with "Copyright ©2049 Citizens Advice" }

    context "when welsh language" do
      before { I18n.locale = :cy }

      it { is_expected.to start_with "Hawlfraint ©2049 Cyngor ar Bopeth" }
    end
  end

  describe "legal summary" do
    subject { component.at("[data-testid='legal-summary']").text }

    it { is_expected.to include "Citizens Advice is an operating name of" }

    context "when welsh language" do
      before { I18n.locale = :cy }

      it { is_expected.to include "Cyngor ar Bopeth yn enw gweithredol ar" }
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
