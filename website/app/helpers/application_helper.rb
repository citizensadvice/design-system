# frozen_string_literal: true

module ApplicationHelper
  def default_meta_tags
    {
      charset: "utf-8",
      site: t("global.title"),
      # By default, meta-tags puts the site name _before_ the page name in the title.
      # We want the opposite. The `reverse` option flips this order.
      reverse: true,
      separator: "-",
      viewport: "width=device-width, initial-scale=1.0",
      "format-detection": "telephone=no",
      noindex: true,
      nofollow: true,
      icon: [
        { href: asset_path("favicon.ico") },
        { href: asset_path("apple-touch-icon.png"), rel: "apple-touch-icon", type: "image/png" }
      ]
    }
  end
end
