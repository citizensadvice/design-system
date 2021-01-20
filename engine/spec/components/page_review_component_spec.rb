# frozen_string_literal: true

RSpec.describe DesignSystem::PageReviewComponent do
  subject(:component) do
    render_inline(
      DesignSystem::PageReviewComponent.new(
        page_review_date: Date.new(2020, 6, 12)
      )
    )
  end

  it "renders page review date" do
    expect(component.text).to include "Page last reviewed on 12 June 2020"
  end
end
