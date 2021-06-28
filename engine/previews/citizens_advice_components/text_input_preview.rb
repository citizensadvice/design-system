# frozen_string_literal: true

module CitizensAdviceComponents
  class TextInputPreview < ViewComponent::Preview
    def text_input_basic
      render(
        CitizensAdviceComponents::TextInput.new(name: "example-input-basic", label: "Example input")
      )
    end

    def text_input_with_hint
      render(
        CitizensAdviceComponents::TextInput.new(
          name: "example-input-with-hint",
          label: "Example input with hint",
          type: :text,
          options: {
            hint: "This is the hint for the input"
          }
        )
      )
    end

    def text_input_optional
      render(
        CitizensAdviceComponents::TextInput.new(
          name: "example-input-optional",
          label: "Example input",
          type: :text,
          options: {
            optional: true
          }
        )
      )
    end

    def text_input_error
      render(
        CitizensAdviceComponents::TextInput.new(
          name: "example-input-error",
          label: "Email address",
          type: :text,
          options: {
            error_message: "Enter a valid email address, like name@example.com"
          }
        )
      )
    end

    def text_input_fixed_widths; end

    def text_input_type
      render(
        CitizensAdviceComponents::TextInput.new(
          name: "example-input-password",
          label: "Example input",
          type: :password,
          options: {
            value: "It's a secret",
            hint: "This input has type 'password'"
          }
        )
      )
    end

    def text_input_additional_attributes
      additional_attributes = {
        autocomplete: "name",
        "data-testid": "my great input"
      }

      render(
        CitizensAdviceComponents::TextInput.new(
          name: "example-input-attrs",
          label: "Example input",
          type: :text,
          options: {
            hint: "This input has the additional attributes (autocomplete and data-testid)",
            additional_attributes: additional_attributes
          }
        )
      )
    end
  end
end
