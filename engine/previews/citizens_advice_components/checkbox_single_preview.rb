# frozen_string_literal: true

module CitizensAdviceComponents
  class CheckboxSinglePreview < ViewComponent::Preview
    def basic
      render CheckboxSingle.new(name: "a-single-checkbox") do |c|
        c.checkbox(checkbox)
      end
    end

    def error
      render CheckboxSingle.new(name: "a-single-checkbox", error_message: "Agree to the terms and conditions") do |c|
        c.checkbox(checkbox)
      end
    end

    private

    def checkbox
      { label: "I agree to the great terms and conditions", value: "agreed-to-tcs" }
    end
  end
end
