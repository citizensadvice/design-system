# frozen_string_literal: true

class TextareaPreview < ViewComponent::Preview
  def basic
    render CitizensAdviceComponents::Textarea.new(
      name: "example-input-basic",
      label: "Example input"
    )
  end

  def value
    copy = "Amet parturient platea augue natoque vitae sem parturient senectus nisi sit nascetur penatibus neque scelerisque rutrum nisl amet odio adipiscing.Ad consectetur quam taciti faucibus etiam parturient a sed."
    render CitizensAdviceComponents::Textarea.new(
      name: "example-input-value",
      label: "Example input",
      options: { value: copy }
    )
  end

  def hint
    render CitizensAdviceComponents::Textarea.new(
      name: "example-input-with-hint",
      label: "Example input with hint",
      options: {
        hint: "This is the hint for the input"
      }
    )
  end

  def optional
    render CitizensAdviceComponents::Textarea.new(
      name: "example-input-optional",
      label: "Example input",
      options: {
        optional: true
      }
    )
  end

  def error
    render CitizensAdviceComponents::Textarea.new(
      name: "example-input-error",
      label: "Email address",
      options: {
        error_message: "Enter a valid email address, like name@example.com"
      }
    )
  end

  def page_heading
    render CitizensAdviceComponents::Textarea.new(
      name: "example-textarea-page-heading",
      label: "Example text area with page heading",
      options: {
        page_heading: true,
        hint: "This is the hint for the input"
      }
    )
  end

  def additional_attributes
    render CitizensAdviceComponents::Textarea.new(
      name: "example-input-attrs",
      label: "Example input",
      options: {
        hint: "This input has additional attributes (spellcheck)",
        additional_attributes: {
          spellcheck: "true"
        }
      }
    )
  end

  def custom_id
    render CitizensAdviceComponents::Textarea.new(
      name: "example-input[basic]",
      id: "test-id",
      label: "Example input"
    )
  end
end
