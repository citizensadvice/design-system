# frozen_string_literal: true

module CitizensAdviceComponents
  class TextareaPreview < ViewComponent::Preview
    def basic
      render(
        CitizensAdviceComponents::Textarea.new(name: "example-input-basic", label: "Example input")
      )
    end

    def value
      render(
        CitizensAdviceComponents::Textarea.new(name: "example-input-value", label: "Example input", value: "Lorem ipsum dolor sit amet.")
      )
    end

    def hint
      render(
        CitizensAdviceComponents::Textarea.new(
          name: "example-input-with-hint",
          label: "Example input with hint",
          type: :text,
          options: {
            hint: "This is the hint for the input"
          }
        )
      )
    end

    def optional
      render(
        CitizensAdviceComponents::Textarea.new(
          name: "example-input-optional",
          label: "Example input",
          type: :text,
          options: {
            optional: true
          }
        )
      )
    end

    def error
      render(
        CitizensAdviceComponents::Textarea.new(
          name: "example-input-error",
          label: "Email address",
          type: :text,
          options: {
            error_message: "Enter a valid email address, like name@example.com"
          }
        )
      )
    end

    def additional_attributes
      additional_attributes = {
        spellcheck: true
      }

      render(
        CitizensAdviceComponents::Textarea.new(
          name: "example-input-attrs",
          label: "Example input",
          type: :text,
          options: {
            hint: "This input has additional attributes (spellcheck)",
            additional_attributes: additional_attributes
          }
        )
      )
    end
  end
end
