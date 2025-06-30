# frozen_string_literal: true

module CitizensAdviceComponents
  class Footer < Base
    attr_reader :homepage_url

    renders_one :feedback_link, "FooterFeedbackLink"

    renders_one :legal_summary, lambda { |text|
      text.presence || legal_summary_default
    }

    renders_many :columns, "FooterColumn"

    def initialize(homepage_url: nil)
      @homepage_url = homepage_url || "/"
    end

    def current_year
      Time.current.year
    end

    def columns_to_show
      columns.take(4)
    end

    def legal_summary_text
      legal_summary.presence || legal_summary_default
    end

    def legal_summary_default
      t("citizens_advice_components.footer.legal_summary")
    end

    class FooterColumn < Base
      attr_reader :title, :links, :text_lines

      def initialize(title:, links: [], text_lines: [])
        @title = title
        @links = links
        @text_lines = text_lines
      end
    end

    class FooterFeedbackLink < Base
      attr_reader :title, :url

      def initialize(url:, title: nil, new_tab: false)
        @url = url.to_s
        @title = title
        @new_tab = new_tab
      end

      def new_tab?
        @new_tab.present?
      end
    end
  end
end
