# frozen_string_literal: true

module CitizensAdviceComponents
  class SectionLinks < Base
    renders_many :section_links, "SectionLink"

    renders_one :custom_content

    attr_reader :title, :section_title, :section_title_url, :additional_attributes

    def initialize(title:, section_title:, section_title_url: nil)
      @title = title
      @section_title = section_title
      @section_title_url = section_title_url
    end

    def render?
      section_links.present? || section_title.present? || custom_content.present?
    end

    class SectionLink
      attr_reader :title, :url, :additional_attributes

      def initialize(title:, url:, **additional_attributes)
        @title = title
        @url = url
        @additional_attributes = additional_attributes
      end
    end
  end
end
