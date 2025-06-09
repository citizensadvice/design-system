# frozen_string_literal: true

module CitizensAdviceComponents
  class Header < Base
    renders_many :skip_links, "SkipLink"
    renders_many :header_links, "HeaderLink"
    renders_many :header_buttons, "HeaderButton"

    renders_one :account_link, "AccountLink"
    renders_one :logo, "HeaderLogo"
    renders_one :search_form, "HeaderSearch"

    def render?
      logo.present?
    end

    def show_right_column?
      header_links.any? || header_buttons.any? || account_link.present? || search_form.present?
    end

    def skip_links_to_show
      skip_links.presence || default_skip_links
    end

    def default_skip_links
      [
        SkipLink.new(
          title: t("citizens_advice_components.header.skip_to_navigation"),
          url: "#cads-navigation"
        ),
        SkipLink.new(
          title: t("citizens_advice_components.header.skip_to_content"),
          url: "#cads-main-content"
        ),
        SkipLink.new(
          title: t("citizens_advice_components.header.skip_to_footer"),
          url: "#cads-footer"
        )
      ]
    end

    class HeaderLogo < Base
      attr_reader :title, :url

      def initialize(title: nil, url: "/")
        super
        @title = title
        @url = url
      end

      def call
        # Renders a block if provided to allow passing a custom logo SVG,
        # otherwise renders the standard logo.
        content.presence || link_to("", url, title: title, class: "cads-logo")
      end
    end

    class SkipLink
      attr_reader :title, :url

      def initialize(title:, url:)
        @title = title
        @url = url
      end
    end

    class HeaderLink < Base
      attr_reader :title, :url, :lang

      def initialize(title:, url:, current_site: false, lang: nil)
        super
        @title = title
        @url = url
        @current_site = current_site
        @lang = lang
      end

      def call
        if current_site?
          tag.span(title, class: "cads-header__text")
        else
          link_to title, url, class: "cads-header__hyperlink", lang: lang
        end
      end

      def current_site?
        @current_site.present?
      end
    end

    class HeaderButton < Base
      attr_reader :title, :url

      def initialize(title:, url:)
        super
        @title = title
        @url = url
      end

      def call
        link_to title, url, class: "cads-button cads-button__primary"
      end
    end

    class AccountLink < Base
      attr_reader :title, :url

      def initialize(title: nil, url: nil)
        super
        @title = title
        @url = url
      end

      def call
        # Renders a block if provided to allow passing a custom form button,
        # otherwise renders a link based on title and url arguments.
        if content.present?
          tag.div(content, class: "cads-header__account-form", "data-testid": "account-link")
        else
          tag.div(class: "cads-header__account-link") do
            link_to(title, url, "data-testid": "account-link")
          end
        end
      end
    end

    class HeaderSearch < Base
      attr_reader :search_action_url, :search_param

      def initialize(search_action_url:, search_param: nil)
        super
        @search_action_url = search_action_url
        @search_param = search_param || :q
      end
    end
  end
end
