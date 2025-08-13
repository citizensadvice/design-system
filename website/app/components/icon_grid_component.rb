# frozen_string_literal: true

class IconGridComponent < ViewComponent::Base
  def icons
    [
      CitizensAdviceComponents::Icons::ArrowLeft,
      CitizensAdviceComponents::Icons::ArrowRight,
      CitizensAdviceComponents::Icons::Close,
      CitizensAdviceComponents::Icons::Email,
      CitizensAdviceComponents::Icons::Error,
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
