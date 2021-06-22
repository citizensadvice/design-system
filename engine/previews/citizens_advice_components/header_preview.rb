# frozen_string_literal: true

module CitizensAdviceComponents
  class HeaderPreview < ViewComponent::Preview
    include ActionView::Helpers::TagHelper

    def with_basic_options
      render(CitizensAdviceComponents::Header.new) do |c|
        c.logo(title: "Citizens Advice homepage", url: "/")
        c.skip_links(skip_links)
        c.header_links(links)
        c.account_link(title: "Sign in", url: "#")
        c.search_form(search_action_url: "/search")
      end
    end

    def with_extra_links
      render(CitizensAdviceComponents::Header.new) do |c|
        c.logo(title: "Citizens Advice homepage", url: "/")
        c.skip_links(skip_links)
        c.header_links([
          { title: "Public site", url: "#", current_site: true },
          { title: "Intranet", url: "#" },
          { title: "Cymraeg", url: "?lang=cy" }
        ])
        c.account_link(title: "Sign out", url: "#")
        c.search_form(search_action_url: "/search")
      end
    end

    def with_custom_account_link
      render(CitizensAdviceComponents::Header.new) do |c|
        c.logo(title: "Citizens Advice homepage", url: "/")
        c.skip_links(skip_links)
        c.header_links(links)
        c.account_link do
          "Custom account link HTML"
        end
        c.search_form(search_action_url: "/search")
      end
    end

    def with_no_search_form
      render(CitizensAdviceComponents::Header.new) do |c|
        c.logo(title: "Citizens Advice homepage", url: "/")
        c.skip_links(skip_links)
        c.header_links(links)
        c.account_link(title: "Sign in", url: "#")
      end
    end

    def with_navigation
      render(CitizensAdviceComponents::Header.new) do |c|
        c.logo(title: "Citizens Advice homepage", url: "/")
        c.skip_links(skip_links)
        c.header_links(links)
        c.account_link(title: "Sign in", url: "#")
        c.search_form(search_action_url: "/search")
        c.navigation(links: navigation_links)
      end
    end

    private

    def links
      [{ title: "Cymraeg", url: "?lang=cy" }]
    end

    def skip_links
      [{ title: "Skip to main content", url: "#content" }]
    end

    def navigation_links
      [
        { title: "Benefits", url: "#" },
        { title: "Work", url: "#" },
        { title: "Debt and money", url: "#" },
        { title: "Consumer", url: "#" },
        { title: "Housing", url: "#" },
        { title: "Family", url: "#" },
        { title: "Law and courts", url: "#" },
        { title: "Immigration", url: "#" },
        { title: "Health", url: "#" },
        { title: "More from us", url: "#" }
      ]
    end
  end
end
