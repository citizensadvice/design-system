# frozen_string_literal: true

module Pagination
  class PagingInfo < ::Base
    set_url "/iframe.html?id=components-pagination--paging-info&args=&viewMode=story"

    element :number_of_results, "h2", text: "123456 results"
  end
end
