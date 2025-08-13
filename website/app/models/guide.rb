# frozen_string_literal: true

Guide = Decant.define(dir: Rails.root.join("content/guides"), ext: "md") do
  include BasePage

  frontmatter :title, :order

  def frontmatter_with_defaults
    frontmatter.with_defaults(on_this_page: true)
  end

  def on_this_page?
    !!frontmatter_with_defaults[:on_this_page]
  end
end
