# frozen_string_literal: true

Component = Decant.define(dir: Rails.root.join("content/components"), ext: "md") do
  include BasePage

  frontmatter :title

  def frontmatter_with_defaults
    frontmatter.with_defaults(on_this_page: true)
  end

  def on_this_page?
    !!frontmatter_with_defaults[:on_this_page]
  end
end
