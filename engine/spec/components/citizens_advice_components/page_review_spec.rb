# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::PageReview, type: :component do
  subject { page }

  context "with default arguments" do
    before do
      render_inline described_class.new(
        page_review_date: Date.new(2021, 6, 12)
      )
    end

    it { is_expected.to have_selector ".cads-page-review", text: "Page last reviewed on 12 June 2021" }

    context "when welsh language" do
      around { |example| I18n.with_locale(:cy) { example.run } }

      it { is_expected.to have_text "Adolygwyd y dudalen ar 12 Mehefin 2021" }
    end
  end

  context "when no date" do
    before do
      render_inline described_class.new(page_review_date: nil)
    end

    it { is_expected.not_to have_selector ".cads-page-review" }
  end

  context "when custom date format" do
    before do
      render_inline described_class.new(
        page_review_date: Date.new(2021, 6, 12),
        date_format: :short
      )
    end

    it { is_expected.to have_text "Page last reviewed on Jun 12" }
  end

  context "when invalid date format" do
    let(:component) do
      described_class.new(page_review_date: Date.new(2021, 20, 12))
    end

    it "raises error for invalid dates" do
      expect { render_inline component }.to raise_error(Date::Error)
    end
  end
end
