# frozen_string_literal: true

module DesignSystem
  class HeaderComponent < ViewComponent::Base
    attr_reader :links, :sign_in_out, :homepage_url, :search_action_url, :main_content_id

    def initialize(
      links:,
      sign_in_out: nil,
      homepage_url: "/",
      search_action_url: "/search",
      main_content_id: "cads-main-content"
    )
      super
      @links = links
      @sign_in_out = sign_in_out
      @homepage_url = homepage_url
      @search_action_url = search_action_url
      @main_content_id = main_content_id
    end
  end
end
