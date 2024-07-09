# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::SummaryList, type: :component do
  subject(:component) { described_class.new(items: items) }

  context "with items" do
    let(:items) { [{ name: "Salary", value: "£26,000" }] }

    it "renders the dl" do
      render_inline component
      expect(page).to have_css "dl.cads-summary-list"
    end
  end

  context "without items" do
    let(:items) { [] }

    it "does not render the dl" do
      render_inline component
      expect(page).to have_no_css "dl.cads-summary-list"
    end
  end
end
