# frozen_string_literal: true

module Foundations
  class IconGrid < ViewComponent::Base
    include Bridgetown::ViewComponentHelpers

    def icons
      [
        CitizensAdviceComponents::Icons::ArrowLeft,
        CitizensAdviceComponents::Icons::ArrowRight,
        CitizensAdviceComponents::Icons::Close,
        CitizensAdviceComponents::Icons::Email,
        CitizensAdviceComponents::Icons::Error,
        CitizensAdviceComponents::Icons::ExternalLink,
        CitizensAdviceComponents::Icons::File,
        CitizensAdviceComponents::Icons::Minus,
        CitizensAdviceComponents::Icons::Plus,
        CitizensAdviceComponents::Icons::Print,
        CitizensAdviceComponents::Icons::Reference,
        CitizensAdviceComponents::Icons::Search,
        CitizensAdviceComponents::Icons::Tick,
        CitizensAdviceComponents::Icons::Trash,
        CitizensAdviceComponents::Icons::Undo
      ]
    end
  end
end
