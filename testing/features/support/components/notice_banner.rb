# frozen_string_literal: true

module DesignSystem
  class NoticeBanner < ::Base
    set_url "/iframe.html?id=components-notice-banner--example&args=&viewMode=story"

    element :notice_banner_title, ".cads-notice-banner__title"
    element :message, "p"
  end
end
