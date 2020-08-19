# frozen_string_literal: true

class GetImmigrationAdvice < SitePrism::Page
  set_url "/immigration/get-immigration-advice"

  elements :related_content_links, ".cads-related-content a"
  element :corona_callout, ".cads-callout.cads-callout-standard h3"
end
