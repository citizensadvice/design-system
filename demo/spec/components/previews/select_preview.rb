# frozen_string_literal: true

class SelectPreview < ViewComponent::Preview
  def default
    render CitizensAdviceComponents::Legacy::Select.new(
      select_options: options, name: "product", label: "Choose a product"
    )
  end

  def error
    render CitizensAdviceComponents::Legacy::Select.new(
      select_options: options,
      name: "product",
      label: "Choose a product",
      options: { error_message: "Select a product" }
    )
  end

  def hint
    render CitizensAdviceComponents::Legacy::Select.new(
      select_options: options, name: "product",
      label: "Choose a product",
      options: { hint: "Choose a product from the list below" }
    )
  end

  def value
    render CitizensAdviceComponents::Legacy::Select.new(
      select_options: options,
      name: "product",
      label: "Choose a product",
      options: { value: "FYLCA", hint: "Choose a product from the list below" }
    )
  end

  def optional
    render CitizensAdviceComponents::Legacy::Select.new(
      select_options: options,
      name: "product",
      label: "Choose a product",
      options: {
        optional: true
      }
    )
  end

  private

  def options
    [
      ["Casebook", "casebook"],
      ["Content platform", "content-platform"],
      ["SMT", "smart-meter-tool"],
      ["Find your local Citizens Advice", "FYLCA"]
    ]
  end
end
