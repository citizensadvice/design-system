# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::PageReview, type: :component do
  subject(:component) do
    render_inline(
      described_class.new(
        page_review_date: page_review_date.presence,
        date_format: date_format.presence
      )
    )
  end

  let(:page_review_date) { Date.new(2021, 6, 12) }
  let(:date_format) { nil }

  it "renders a formatted date" do
    expect(component.text.strip).to eq "Page last reviewed on 12 June 2021"
  end

  context "when no date" do
    let(:page_review_date) { nil }

    it "does not render" do
      expect(component.at(".cads-page-review")).not_to be_present
    end
  end

  context "when custom date format" do
    let(:date_format) { :short }

    it "renders date with custom format" do
      expect(component.text.strip).to eq "Page last reviewed on Jun 12"
    end
  end

  context "when welsh language" do
    before { I18n.locale = :cy }

    it "has translated date" do
      expect(component.text.strip).to eq "Adolygwyd y dudalen ar 12 Mehefin 2021"
    end
  end
end
