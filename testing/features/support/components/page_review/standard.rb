# frozen_string_literal: true

module PageReview
  class Standard < ::Base
    set_url "/iframe.html?id=components-page-review--example&viewMode=story"

    element :reviewed_on, ".cads-page-review"
    element :bold_date, "strong"

    def localised_reviewed_on_prefix
      I18n.t("cads.page_review.body_html").split("<strong>").first
    end
  end
end
