# frozen_string_literal: true

module CitizensAdviceComponents
  class Footer < Base
    attr_reader :homepage_url, :feedback_url

    renders_one :feedback_link, "FooterFeedbackLink"

    renders_many :columns, "FooterColumn"

    def initialize(homepage_url: nil, feedback_url: nil)
      super
      @homepage_url = homepage_url || "/"
      @feedback_url = feedback_url.to_s

      feedback_url_deprecation
    end

    def current_year
      Time.current.year
    end

    def columns_to_show
      columns.take(4)
    end

    def feedback
      feedback_link.presence || feedback_link_fallback.presence
    end

    def feedback_link_fallback
      return if @feedback_url.blank?

      # Provide a fallback FooterFeedbackLink instance
      # using the previous defaults for backwards compatability
      # with the deprecated @feedback_url param.
      FooterFeedbackLink.new(
        url: @feedback_url,
        title: t("citizens_advice_components.footer.website_feedback"),
        external: true,
        new_tab: true
      )
    end

    def feedback_url_deprecation
      return if @feedback_url.blank?

      ActiveSupport::Deprecation.warn(
        "feedback_url argument is deprecated used feedback_link slot instead"
      )
    end

    class FooterColumn < Base
      attr_reader :title, :links, :icon

      def initialize(title:, links:)
        super
        @title = title
        @links = links

        icon_option_deprecation
      end

      def icon_option_deprecation
        return unless links.any? { |link| link[:icon].present? }

        ActiveSupport::Deprecation.warn(
          "generic `icon` property for column links is deprecated use `external: true` instead"
        )
      end
    end

    class FooterFeedbackLink < Base
      attr_reader :title, :url

      def initialize(url:, title: nil, external: false, new_tab: false)
        super

        @url = url.to_s
        @title = title || t("citizens_advice_components.footer.website_feedback")
        @external = external
        @new_tab = new_tab
      end

      def external?
        @external.present?
      end

      def new_tab?
        @new_tab.present?
      end

      def new_tab_atrributes
        return {} unless new_tab?

        {
          target: "_blank",
          rel: "noopener",
          "aria-label": "#{title} (opens in a new tab)"
        }
      end
    end
  end
end
