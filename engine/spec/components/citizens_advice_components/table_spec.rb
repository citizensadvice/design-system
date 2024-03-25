# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Table, type: :component do
  subject { page }

  context "when missing headers" do
    before do
      render_inline described_class.new(
        header: [],
        rows: sample_rows
      )
    end

    it { is_expected.to have_no_table }
  end

  context "when missing rows" do
    before do
      render_inline described_class.new(
        header: sample_header,
        rows: []
      )
    end

    it { is_expected.to have_no_table }
  end

  context "when valid table" do
    before do
      render_inline described_class.new(
        header: sample_header,
        rows: sample_rows
      )
    end

    it { is_expected.to have_css ".cads-table-container" }
    it { is_expected.to have_css ".cads-table" }
    it { is_expected.to have_no_css "caption" }

    it { is_expected.to have_css "thead", count: 1 }
    it { is_expected.to have_css "tbody", count: 1 }

    it { is_expected.to have_css "th", count: sample_header.size }
    it { is_expected.to have_css "th[scope=col]", text: "Your location" }
    it { is_expected.to have_css "th[scope=col]", text: "Post box collection times" }
    it { is_expected.to have_css ".cads-table__th-heading", text: "Your location", count: sample_rows.size }
    it { is_expected.to have_css ".cads-table__th-heading", text: "Post box collection time", count: sample_rows.size }

    it { is_expected.to have_css "tbody tr", count: sample_rows.size }
    it { is_expected.to have_css "tbody td", count: sample_rows.size * 2 }
    it { is_expected.to have_css "td", text: "City or town" }
    it { is_expected.to have_css "td", text: "9am to 6.30pm" }
  end

  context "when a caption is present" do
    before do
      render_inline described_class.new(
        header: sample_header,
        rows: sample_rows,
        caption: "Example caption"
      )
    end

    it { is_expected.to have_css "caption", text: "Example caption" }
  end

  context "when additional empty rows" do
    before do
      render_inline described_class.new(
        header: sample_header,
        rows: sample_rows.push(["", ""], [nil, nil], ["", nil])
      )
    end

    it "strips empty rows" do
      expect(page).to have_css "tbody tr", count: sample_rows.size
    end
  end

  describe "responsive_headers" do
    context "when the responsive_headers option is not set" do
      before do
        render_inline described_class.new(
          header: sample_header,
          rows: sample_rows,
          caption: "Example caption"
        )
      end

      it { is_expected.to have_css "[data-testid='table-inline-heading']" }
      it { is_expected.to have_css ".cads-table--responsive-headers" }
    end

    context "when the responsive_headers option is set to true" do
      before do
        render_inline described_class.new(
          header: sample_header,
          rows: sample_rows,
          caption: "Example caption",
          responsive_headers: true
        )
      end

      it { is_expected.to have_css "[data-testid='table-inline-heading']" }
      it { is_expected.to have_css ".cads-table--responsive-headers" }
    end

    context "when the responsive_headers option is set to false" do
      before do
        render_inline described_class.new(
          header: sample_header,
          rows: sample_rows,
          caption: "Example caption",
          responsive_headers: false
        )
      end

      it { is_expected.to have_no_css "[data-testid='table-inline-heading']" }
      it { is_expected.to have_no_css ".cads-table--responsive-headers" }
    end
  end

  private

  def sample_header
    ["Your location", "Post box collection times"]
  end

  def sample_rows
    [
      ["City or town", "9am to 6.30pm"],
      ["Areas with lots of businesses - known as commercial", "9am to 7.30pm"],
      ["Very rural areas - for example, where there aren't many people", "9am to 4pm"],
      ["Rest of the UK", "9am to 5.30pm"]
    ]
  end
end
