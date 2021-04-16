# frozen_string_literal: true

module CucumberInfo
  class Tags
    def initialize(tags)
      @tags = tags
    end

    def advisernet?
      @tags.include?("@advisernet")
    end

    def requires_regular_login?
      @tags.include?("@requires_regular_login")
    end
  end
end
