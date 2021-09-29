# frozen_string_literal: true

module CitizensAdviceComponents
  class Footer < Base
    attr_reader :homepage_url, :feedback_url

    renders_many :columns, "FooterColumn"

    def initialize(homepage_url: nil, feedback_url: nil)
      super
      @homepage_url = homepage_url || "/"
      @feedback_url = feedback_url
    end

    def current_year
      Time.zone.today.year
    end

    def columns_to_show
      columns.take(4)
    end

    class FooterColumn < Base
      attr_reader :title, :links, :icon

      def initialize(title:, links:)
        super
        @title = title
        @links = links
      end
    end
  end
end
