# frozen_string_literal: true

module CitizensAdviceComponents
  class Sidebar < Base
    renders_many :sidebar_links, "SidebarLink"
    renders_one :section_title, "SectionTitle"

    attr_reader :title

    def initialize(title:)
      super
      @title = title
    end

    def render?
      sidebar_links.present?
    end

    class SectionTitle
      attr_reader :title, :url

      def initialize(title:, url: nil)
        @title = title
        @url = url
      end
    end

    class SidebarLink
      attr_reader :title, :url

      def initialize(title:, url:)
        @title = title
        @url = url
      end
    end
  end
end
