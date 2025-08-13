# frozen_string_literal: true

Page = Decant.define(dir: Rails.root.join("content/pages"), ext: "md") do
  include BasePage

  frontmatter :title
end
