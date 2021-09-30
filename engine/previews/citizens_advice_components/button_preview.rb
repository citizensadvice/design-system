# frozen_string_literal: true

module CitizensAdviceComponents
  class ButtonPreview < ViewComponent::Preview
    def primary
      render CitizensAdviceComponents::Button.new do
        "Primary button"
      end
    end

    def secondary
      render CitizensAdviceComponents::Button.new(variant: :secondary) do
        "Secondary button"
      end
    end

    def tertiary
      render CitizensAdviceComponents::Button.new(variant: :tertiary) do
        "Tertiary button"
      end
    end

    def with_left_icon; end

    def with_right_icon; end
  end
end
