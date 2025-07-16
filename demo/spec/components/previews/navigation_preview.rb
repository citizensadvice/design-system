# frozen_string_literal: true

class NavigationPreview < ViewComponent::Preview
  def example
    render CitizensAdviceComponents::Navigation.new(
      links: [
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
    )
  end

  def short
    render CitizensAdviceComponents::Navigation.new(
      links: [
        { url: "/intranet/", title: "Home" },
        { url: "/intranet/national/browse/", title: "Topics" },
        { url: "/intranet/search/", title: "Search" }
      ]
    )
  end
end
