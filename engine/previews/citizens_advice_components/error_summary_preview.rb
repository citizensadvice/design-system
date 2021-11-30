# frozen_string_literal: true

module CitizensAdviceComponents
  class ErrorSummaryPreview < ViewComponent::Preview
    def example
      render CitizensAdviceComponents::ErrorSummary.new do |c|
        c.error(
          href: "#",
          message: "Enter your full name"
        )
        c.error(
          href: "#",
          message: "Enter an email address in the correct format, like name@example.com"
        )
      end
    end
  end
end
