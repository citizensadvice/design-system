# frozen_string_literal: true

module CitizensAdviceComponents
  class SectionLinks < Base
    renders_many :section_links, "SectionLink"
    renders_one :section_title, "SectionTitle"

    attr_reader :title

    def initialize(title:)
      super
      @title = title
    end

    def render?
      section_links.present?
    end

    class SectionTitle
      attr_reader :title, :url

      def initialize(title:, url: nil)
        @title = title
        @url = url
      end
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
