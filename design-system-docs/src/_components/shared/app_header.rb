# frozen_string_literal: true

module Shared
  class AppHeader < ViewComponent::Base
    def initialize
      @site = Bridgetown::Current.site
    end
  end
end
