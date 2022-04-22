# frozen_string_literal: true

class ErrorSummaryPreview < ViewComponent::Preview
  def example
    render CitizensAdviceComponents::ErrorSummary.new do |c|
      c.errors([
        { href: "#your-name-input", message: "Enter your full name" },
        { href: "#your-email-input", message: "Enter an email address in the correct format, like name@example.com" }
      ])
    end
  end
end
