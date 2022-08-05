# frozen_string_literal: true

module Shared
  class AppHeader < ViewComponent::Base
    include Bridgetown::ViewComponentHelpers

    def initialize
      @site = Bridgetown::Current.site
    end
  end
end
