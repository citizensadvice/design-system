# frozen_string_literal: true

module DesignSystem
  class PageReviewComponentPreview < ViewComponent::Preview
    def example
      render(
        DesignSystem::PageReviewComponent.new(
          page_review_date: Date.new(2020, 6, 12)
        )
      )
    end
  end
end
