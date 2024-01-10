# frozen_string_literal: true

class CheckboxSinglePreview < ViewComponent::Preview
  def basic
    render CitizensAdviceComponents::CheckboxSingle.new(name: "a-single-checkbox") do |c|
      c.with_checkbox(label: "I agree to the great terms and conditions", value: "agreed-to-tcs")
    end
  end

  def error
    render CitizensAdviceComponents::CheckboxSingle.new(name: "a-single-checkbox", error_message: "Agree to the terms and conditions") do |c|
      c.with_checkbox(label: "I agree to the great terms and conditions", value: "agreed-to-tcs")
    end
  end

  def custom_id
    render CitizensAdviceComponents::CheckboxSingle.new(name: "a-single-checkbox[test]", id: "test-id") do |c|
      c.with_checkbox(label: "I agree to the great terms and conditions", value: "agreed-to-tcs")
    end
  end
end
