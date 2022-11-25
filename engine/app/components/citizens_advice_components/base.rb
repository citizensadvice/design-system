# frozen_string_literal: true

module CitizensAdviceComponents
  class Base < ViewComponent::Base
    include FetchOrFallbackHelper

    # Workaround for https://github.com/ViewComponent/view_component/issues/1565
    def self.config
      @config ||= ViewComponent::Config.defaults.merge(ViewComponent::Base.config)
    end
  end
end
