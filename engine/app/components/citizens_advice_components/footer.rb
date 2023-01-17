# frozen_string_literal: true

module CitizensAdviceComponents
  class Footer < Base
    attr_reader :homepage_url, :feedback_url, :hide_logo

    renders_one :feedback_link, "FooterFeedbackLink"
    renders_one :logo, "FooterLogo"

    renders_one :legal_summary, lambda { |text|
      text.presence || t("citizens_advice_components.footer.legal_summary")
    }

    renders_many :columns, "FooterColumn"

    def initialize(homepage_url: nil, feedback_url: nil, hide_logo: false)
      super
      @homepage_url = homepage_url || "/"
      @feedback_url = feedback_url.to_s
      @hide_logo = hide_logo

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

    def render_logo
      return if hide_logo

      logo.presence || fallback_logo.presence
    end

    def fallback_logo
      link_to("", homepage_url, title: t("citizens_advice_components.footer.logo_title"), class: "cads-logo")
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

    def legal_summary_text
      legal_summary.presence || legal_summary_fallback.presence
    end

    def legal_summary_fallback
      return if legal_summary

      t("citizens_advice_components.footer.legal_summary")
    end

    class FooterLogo < Base
      attr_reader :title, :url

      def initialize(title: nil, url: "/")
        super
        @title = title || t("citizens_advice_components.footer.logo_title")
        @url = url
      end

      def call
        # Renders a block if provided to allow passing a custom logo SVG,
        # otherwise renders the standard logo.
        content.presence || link_to("", url, title: title, class: "cads-logo")
      end
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
        @title = title
        @external = external
        @new_tab = new_tab
      end

      def external?
        @external.present?
      end

      def new_tab?
        @new_tab.present?
      end

      def new_tab_attributes
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
