# frozen_string_literal: true

module CitizensAdviceComponents
  class PageReview < Base
    def initialize(page_review_date:, date_format: nil)
      super
      @date_format = date_format || "%d %B %Y"
      @page_review_date = page_review_date
    end

    def call
      tag.p(t("citizens_advice_components.page_review.body_html", date: formatted_date), class: "cads-page-review")
    end

    def formatted_date
      I18n.l(@page_review_date, format: @date_format)
    end

    def render?
      @page_review_date.present?
    end
  end
end
