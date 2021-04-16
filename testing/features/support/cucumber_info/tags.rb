# frozen_string_literal: true

module CucumberInfo
  class Tags
    def initialize(tags)
      @tags = tags
    end

    def not_ios12?
      @tags.include?("@not_ios12")
    end

    def not_mobile?
      @tags.include?("@not_mobile")
    end
  end
end
