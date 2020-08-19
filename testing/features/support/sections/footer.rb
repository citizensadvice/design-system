# frozen_string_literal: true

class Footer < SitePrism::Section
  elements :category_titles, ".cads-grid-col-md-3 > h2"
  element :company_info, ".cads-footer__company-info"

  def category_title_names
    category_titles.map(&:text)
  end
end
