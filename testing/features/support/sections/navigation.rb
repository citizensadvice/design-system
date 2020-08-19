# frozen_string_literal: true

class Navigation < SitePrism::Section
  elements :navigation_list, "nav.cads-navigation li"

  def main_nav_list
    navigation_list.map(&:text)
  end
end
