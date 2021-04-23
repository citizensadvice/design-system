# frozen_string_literal: true

module CitizensAdviceComponents
  class PageReviewComponentPreview < ViewComponent::Preview
    def example
      render(
        CitizensAdviceComponents::PageReviewComponent.new(
          page_review_date: Date.new(2020, 6, 12)
        )
      )
    end
  end
end
