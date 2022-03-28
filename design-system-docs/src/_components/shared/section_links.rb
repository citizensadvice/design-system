# frozen_string_literal: true

module Shared
  class SectionLinks < ViewComponent::Base
    def initialize(section_links:)
      super

      @section_links = section_links
    end
  end
end
