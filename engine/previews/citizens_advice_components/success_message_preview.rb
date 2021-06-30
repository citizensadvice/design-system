# frozen_string_literal: true

module CitizensAdviceComponents
  class SuccessMessagePreview < ViewComponent::Preview
    def example
      render CitizensAdviceComponents::SuccessMessage.new(
        message: "Thank you for your feedback"
      )
    end
  end
end
