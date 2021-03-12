# frozen_string_literal: true

RSpec.describe DesignSystem::PageReviewComponent do
  before { I18n.locale = :en }

  subject(:component) do
    render_inline(
      DesignSystem::PageReviewComponent.new(
        page_review_date: Date.new(2020, 6, 12)
      )
    )
  end

  it "renders page review date" do
    expect(component.text.strip).to eq "Page last reviewed on 12 June 2020"
  end

  context "when welsh language" do
    before { I18n.locale = :cy }

    it "has translated date" do
      expect(component.text.strip).to eq "Adolygwyd y dudalen ar 12 Mehefin 2020"
    end
  end
end
