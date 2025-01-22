# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::SummaryList, type: :component do
  subject { page }

  context "with items" do
    before do
      render_inline described_class.new(items: [
        { name: "Example name A", value: "Example value A" },
        { name: "Example name B", value: nil }
      ])
    end

    it { is_expected.to have_css "dl.cads-summary-list" }
    it { is_expected.to have_css "dt", count: 2 }
    it { is_expected.to have_css "dt", text: "Example name A" }
    it { is_expected.to have_css "dd", text: "Example value A" }
    it { is_expected.to have_css "dt", text: "Example name B" }
  end

  context "with hide_empty_rows" do
    before do
      render_inline described_class.new(items: [
        { name: "Example name A", value: "Example value A" },
        { name: "Example name B", value: nil }
      ], hide_empty_rows: true)
    end

    it { is_expected.to have_css "dl.cads-summary-list" }
    it { is_expected.to have_css "dt", count: 1 }
    it { is_expected.to have_css "dt", text: "Example name A" }
    it { is_expected.to have_css "dd", text: "Example value A" }
    it { is_expected.to have_no_css "dt", text: "Example name B" }
  end

  context "without items" do
    before do
      render_inline described_class.new(items: [])
    end

    it { is_expected.to have_no_css "dl.cads-summary-list" }
  end
end
