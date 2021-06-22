# frozen_string_literal: true

module CitizensAdviceComponents
  class InputPreview < ViewComponent::Preview
    def input_basic 
      render CitizensAdviceComponents::Input.new(name: "example-input-basic", label: "Example input")
    end

    def input_with_hint
      render CitizensAdviceComponents::Input.new(name: "example-input-with-hint", label: "Example input with hint", hint: "This is the hint for the input")
    end

    def input_optional
      render CitizensAdviceComponents::Input.new(name: "example-input-optional", label: "Example input", optional: true)
    end

    def input_error
      render CitizensAdviceComponents::Input.new(name: "example-input-error", label: "Example input", error_message: "Enter your full name")
    end
  end
end
