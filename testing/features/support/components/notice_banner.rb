# frozen_string_literal: true

module DesignSystem
  class NoticeBanner < ::Base

    set_url "/iframe.html?id=components-notice-banner--example&args=&viewMode=story"

    element :title, ".cads-notice-banner__title"
    element :text, ".cads-notice-banner p"
  end
end
