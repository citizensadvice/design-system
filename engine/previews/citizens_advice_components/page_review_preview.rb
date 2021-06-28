# frozen_string_literal: true

module CitizensAdviceComponents
  class PageReviewPreview < ViewComponent::Preview
    def example
      render(
        CitizensAdviceComponents::PageReview.new(
          page_review_date: Date.new(2020, 9, 21)
        )
      )
    end
  end
end
