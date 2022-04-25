# frozen_string_literal: true

class CheckboxSinglePreview < ViewComponent::Preview
  def basic
    render CitizensAdviceComponents::CheckboxSingle.new(name: "a-single-checkbox") do |c|
      c.checkbox(checkbox)
    end
  end

  def error
    render CitizensAdviceComponents::CheckboxSingle.new(name: "a-single-checkbox", error_message: "Agree to the terms and conditions") do |c|
      c.checkbox(checkbox)
    end
  end

  private

  def checkbox
    { label: "I agree to the great terms and conditions", value: "agreed-to-tcs" }
  end
end
