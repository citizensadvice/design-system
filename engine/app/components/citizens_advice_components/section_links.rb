# frozen_string_literal: true

module CitizensAdviceComponents
  class SectionLinks < Base
    renders_many :section_links, "SectionLink"

    attr_reader :title, :section_title, :section_title_url

    def initialize(title:, section_title:, section_title_url: nil)
      super
      @title = title
      @section_title = section_title
      @section_title_url = section_title_url
    end

    def render?
      section_links.present?
    end

    class SectionLink
      attr_reader :title, :url

      def initialize(title:, url:)
        @title = title
        @url = url
      end
    end
  end
end
