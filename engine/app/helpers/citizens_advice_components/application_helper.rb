# frozen_string_literal: true

module CitizensAdviceComponents
  module ApplicationHelper
    def cads_meta_head
      cads_meta_preload_fonts
    end

    def cads_meta_preload_fonts
      safe_join([
        tag.link(href: asset_path("open-sans-v26-latin-700.woff2"), rel: "preload", as: "font", type: "font/woff2", crossorigin: "true"),
        tag.link(href: asset_path("open-sans-v26-latin-regular.woff2"), rel: "preload", as: "font", type: "font/woff2", crossorigin: "true"),
        tag.link(href: asset_path("cads.woff"), rel: "preload", as: "font", type: "font/woff", crossorigin: "true")
      ])
    end
  end
end
