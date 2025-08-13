# frozen_string_literal: true

Foundation = Decant.define(dir: Rails.root.join("content/foundations"), ext: "md") do
  include BasePage

  frontmatter :title, :order
end
