# frozen_string_literal: true

class Immigration < SitePrism::Page
  set_url "/immigration"

  section :footer, Footer, "footer"
  section :header, Header, "header"
  section :navigation, Navigation, "nav"
  sections :topics, ".cads-grid-col-lg-12 h2" do
    # Due to the way that the DOM is structured, XPath is required
    # to scope links to their topics
    elements :links, :xpath, "./following-sibling::ul[1]/li/a"
  end

  elements :breadcrumbs, ".cads-breadcrumbs li"
  elements :navigation_list, "nav.cads-navigation li"

  load_validation do
    AutomationLogger.debug("Immigration Page is loading slowly in some environments - Adding waiter.")
    [has_breadcrumbs?(wait: 5), "No breadcrumbs were visible within 5 seconds."]
  end

  def breadcrumb_list
    breadcrumbs.map(&:text)
  end

  def main_header_list
    navigation_list.map(&:text)
  end

  def topic_list
    topics.map(&:text)
  end

  def link_list
    topics.map { |topic| topic.links.map(&:text) }.flatten
  end
end
