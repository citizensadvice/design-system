# frozen_string_literal: true

module CitizensAdviceComponents
  class Header < Base
    renders_many :skip_links, "SkipLink"
    renders_many :header_links, "HeaderLink"

    renders_one :account_link, "AccountLink"

    renders_one :logo, lambda { |title:, url:|
      link_to url, class: "cads-logo" do
        content_tag :span, title, class: "cads-sr-only"
      end
    }

    renders_one :search_form, "HeaderSearch"

    def render?
      logo.present?
    end

    class SkipLink < Base
      attr_reader :title, :url

      def initialize(title:, url:)
        super
        @title = title
        @url = url
      end

      def call
        link_to title, url, class: "cads-skip-links__link"
      end
    end

    class HeaderLink < Base
      attr_reader :title, :url

      def initialize(title:, url:, current_site: false)
        super
        @title = title
        @url = url
        @current_site = current_site
      end

      def call
        if current_site?
          content_tag :span, title, class: "cads-header__text"
        else
          link_to title, url, class: "cads-header__hyperlink"
        end
      end

      def current_site?
        @current_site.present?
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
          content_tag(:div, content, class: "cads-header__account-form", "data-testid": "account-link")
        else
          tag.div(class: "cads-header__account-link") do
            link_to(title, url, "data-testid": "account-link")
          end
        end
      end
    end

    class HeaderSearch < Base
      attr_reader :search_action_url, :search_param

      def initialize(search_action_url:, search_param: :q)
        super
        @search_action_url = search_action_url
        @search_param = search_param
      end

      def render?
        search_action_url.present?
      end
    end
  end
end
