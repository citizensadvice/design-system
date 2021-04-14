# frozen_string_literal: true

module Pagination
  class Example < ::Base
    set_url "/iframe.html?id=components-pagination--example&args=&viewMode=story"

    element :current_page, "[aria-current='page']"

    def current_page_number
      current_page.text.to_i
    end

    def previous_page(n_previous_page)
      (current_page_number - n_previous_page).to_s
    end

    def next_page(n_next_page)
      (current_page_number + n_next_page).to_s
    end
  end
end
