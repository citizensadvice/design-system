# frozen_string_literal: true

module PageReview
  class Example < ::Base
    set_url "/iframe.html?id=components-page-review--example&viewMode=story"

    element :reviewed_on, ".cads-page-review"
    element :bold_date, "strong"
  end
end
