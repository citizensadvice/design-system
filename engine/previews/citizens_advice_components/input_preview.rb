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
      render CitizensAdviceComponents::Input.new(name: "example-input-error", label: "Email address", value: "helloexample.com", error_message: "Enter a valid email address, like name@example.com")
    end

    def input_fixed_width
      render CitizensAdviceComponents::Input.new(name: "example-input-fixed-width", label: "Example input", hint: "This input is 4ch wide", width: "4ch")
    end

    def input_type
      render CitizensAdviceComponents::Input.new(name: "example-input-password", label: "Example input", hint: "This input has type 'password'", value: "It's a secret", type: "password")
    end

    def input_additional_attributes
      additional_attributes = {
        autocomplete: "name",
        "data-testid": "my great input"
      }

      render CitizensAdviceComponents::Input.new(name: "example-input-attrs", label: "Example input", hint: "This input has the additional attributes (autocomplete and data-testid)", additional_attributes: additional_attributes)
    end
  end
end
