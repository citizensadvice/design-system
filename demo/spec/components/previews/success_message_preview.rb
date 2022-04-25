# frozen_string_literal: true

class SuccessMessagePreview < ViewComponent::Preview
  def example
    render CitizensAdviceComponents::SuccessMessage.new(
      message: "Thank you for your feedback"
    )
  end
end
