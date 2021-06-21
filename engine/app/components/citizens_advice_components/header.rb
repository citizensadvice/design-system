# frozen_string_literal: true

module CitizensAdviceComponents
  class Header < Base
    renders_many :skip_links, "HeaderLink"
    renders_many :links, "HeaderLink"

    # If custom_account_link then a block will be rendered
    # allowing custom HTML to be provided, otherwise the
    # component expects a account_link(title: "", url: "#") slot
    renders_one :account_link, "HeaderLink"
    renders_one :custom_account_link

    renders_one :search_form, "HeaderSearch"

    attr_reader :homepage_url

    def initialize(homepage_url: nil)
      super
      @homepage_url = homepage_url || "/"
    end

    def toggle_button_attributes
      {
        title: t("citizens_advice_components.header.open_search"),
        "aria-expanded": "false",
        "data-testid": "expand-button",
        "data-descriptive-label-show": t("citizens_advice_components.header.open_search"),
        "data-descriptive-label-hide": t("citizens_advice_components.header.close_search")
      }
    end

    class HeaderLink < ViewComponent::Base
      attr_reader :title, :url

      def initialize(title:, url:, current_site: false)
        super
        @title = title
        @url = url
        @current_site = current_site
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
