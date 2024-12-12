# frozen_string_literal: true

class TextInputPreview < ViewComponent::Preview
  def basic
    render(
      CitizensAdviceComponents::TextInput.new(name: "example-input-basic", label: "Example input", type: :text)
    )
  end

  def value
    render(
      CitizensAdviceComponents::TextInput.new(name: "example-input-value", label: "Example input", options: { value: "Lorem ipsum" },
                                              type: :text)
    )
  end

  def hint
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

  def optional
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

  def error
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

  def page_heading
    render(
      CitizensAdviceComponents::TextInput.new(
        name: "example-input-page-heading",
        label: "Example input with page heading",
        type: :text,
        options: {
          page_heading: true,
          hint: "This is the hint for the input"
        }
      )
    )
  end

  def fixed_widths; end

  def type
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

  def additional_attributes
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
          additional_attributes:
        }
      )
    )
  end

  def custom_id
    render(
      CitizensAdviceComponents::TextInput.new(name: "example-input[custom-id]", label: "Example input", id: "test-id", type: :text)
    )
  end
end
