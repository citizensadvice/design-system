# frozen_string_literal: true

module Shared
  class IconGrid < ViewComponent::Base
    include Bridgetown::ViewComponentHelpers

    def icons
      [
        # @TODO: Add all icons
        CitizensAdviceComponents::Icons::ArrowLeft,
        CitizensAdviceComponents::Icons::ArrowRight,
        CitizensAdviceComponents::Icons::Tick,
        CitizensAdviceComponents::Icons::Close,
        CitizensAdviceComponents::Icons::Trash,
        CitizensAdviceComponents::Icons::Email,
        CitizensAdviceComponents::Icons::Error,
        CitizensAdviceComponents::Icons::ExternalLink
      ]
    end
  end
end
