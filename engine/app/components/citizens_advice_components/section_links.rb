# frozen_string_literal: true

module CitizensAdviceComponents
  class SectionLinks < Base
    renders_many :section_links, "SectionLink"

    renders_one :custom_content

    attr_reader :title, :section_title, :section_title_url, :additional_attributes

    def initialize(title:, section_title:, section_title_url: nil)
      super
      @title = title
      @section_title = section_title
      @section_title_url = section_title_url
    end

    def render?
      section_links.present? || section_title.present? || extra_content.present?
    end

    def extra_content
      @extra_content ||= extra_content_with_deprecation
    end

    private

    def extra_content_with_deprecation
      if custom_content.present?
        custom_content
      elsif content.respond_to?(:to_str) && content.present?
        ActiveSupport::Deprecation.warn(
          "Use custom_content slot instead of default content block"
        )

        content
      end
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
