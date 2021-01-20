# frozen_string_literal: true

module DesignSystem
  class PageReviewComponent < ViewComponent::Base
    attr_reader :page_review_date

    def initialize(page_review_date:)
      super
      @page_review_date = I18n.l(page_review_date, format: "%d %B %Y")
    end
  end
end
