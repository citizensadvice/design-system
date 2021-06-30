# frozen_string_literal: true

module CitizensAdviceComponents
  class HeaderPreview < ViewComponent::Preview
    def full_example
      render_with_template(
        locals: {
          skip_links: skip_links,
          header_links: header_links,
          navigation_links: navigation_links
        }
      )
    end

    def with_links
      render CitizensAdviceComponents::Header.new do |c|
        c.logo(title: "Citizens Advice homepage", url: "/")
        c.skip_links(skip_links)
        c.header_links(header_links)
        c.search_form(search_action_url: "/search")
        c.account_link(title: "Sign in", url: "/sign-in")
      end
    end

    def minimal
      render CitizensAdviceComponents::Header.new do |c|
        c.logo(title: "Citizens Advice homepage", url: "/")
        c.skip_links(skip_links)
        c.header_links([{ title: "Cymraeg", url: "?lang=cy" }])
        c.search_form(search_action_url: "/search")
      end
    end

    private

    def navigation_links
      [
        { url: "/benefits/", title: "Benefits" },
        { url: "/work/", title: "Work" },
        { url: "/debt-and-money/", title: "Debt and money" },
        { url: "/consumer/", title: "Consumer" },
        { url: "/housing/", title: "Housing" },
        { url: "/family/", title: "Family" },
        { url: "/law-and-courts/", title: "Law and courts" },
        { url: "/immigration/", title: "Immigration" },
        { url: "/health/", title: "Health" },
        { url: "/more", title: "More from us" }
      ]
    end

    def header_links
      [
        { title: "Public site", url: "/", current_site: true },
        { title: "AdviserNet", url: "?advisernet" },
        { title: "CABLink", url: "?CABLink" },
        { title: "BMIS", url: "?BMIS" },
        { title: "Cymraeg", url: "?lang=cy" }
      ]
    end

    def skip_links
      [
        { title: "Skip to navigation", url: "#cads-navigation" },
        { title: "Skip to main content", url: "#cads-main-content" },
        { title: "Skip to footer", url: "#cads-footer" }
      ]
    end
  end
end
