# frozen_string_literal: true

module CitizensAdviceComponents
  class Header < Base
    renders_many :skip_links, "HeaderLink"
    renders_many :header_links, "HeaderLink"

    # Renders a block if provided to allow passing custom HTML,
    # otherwise renders a link based on title and url arguments.
    renders_one :account_link, lambda { |title: nil, url: nil, &block|
      return block.call if block

      link_to(title, url, class: "cads-header__hyperlink", "data-testid": "account-link")
    }

    renders_one :search_form, "HeaderSearch"

    renders_one :logo, lambda { |title:, url:|
      link_to url, class: "cads-logo" do
        content_tag :span, title, class: "cads-sr-only"
      end
    }

    def render?
      logo.present?
    end

    def search_form_toggle_button
      tag.button(
        class: "cads-header__search-reveal js-cads-search-reveal cads-icon_search",
        title: t(".open_search"),
        "aria-expanded": "false",
        "data-testid": "expand-button",
        "data-descriptive-label-show": t(".open_search"),
        "data-descriptive-label-hide": t(".close_search")
      )
    end

    class HeaderLink < ViewComponent::Base
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
