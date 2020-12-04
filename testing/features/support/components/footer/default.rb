# frozen_string_literal: true

module Footer
  class Default < Minimal
    set_url "/iframe.html?id=components-footer--default-story&viewMode=story"

    sections :category_titles, ".cads-grid-col-md-3 > h2" do
      elements :links, :xpath, "./following-sibling::ul[1]/li/a"
    end

    element :website_feedback, ".cads-footer__feedback a"

    def validate_initial_state!
      has_category_titles?(wait: 5)
    end
  end
end
