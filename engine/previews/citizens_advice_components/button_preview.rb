# frozen_string_literal: true

module CitizensAdviceComponents
  class ButtonPreview < ViewComponent::Preview
    def standard
      render CitizensAdviceComponents::Button.new do
        "Example button"
      end
    end

    def with_icon; end
  end
end
