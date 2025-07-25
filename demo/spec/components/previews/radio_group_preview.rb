# frozen_string_literal: true

class RadioGroupPreview < ViewComponent::Preview
  def basic
    render CitizensAdviceComponents::RadioGroup.new(
      legend: "Example radio group",
      name: "radio-buttons"
    ) do |c|
      c.with_inputs(radios)
    end
  end

  def custom_id
    render CitizensAdviceComponents::RadioGroup.new(
      legend: "Example radio group",
      name: "radio-buttons[test]",
      id: "test-id"
    ) do |c|
      c.with_inputs(radios)
    end
  end

  def error
    render CitizensAdviceComponents::RadioGroup.new(
      legend: "Example radio group",
      name: "radio-buttons-error",
      options: {
        error_message: "Select an option"
      }
    ) do |c|
      c.with_inputs(radios)
    end
  end

  def optional
    render CitizensAdviceComponents::RadioGroup.new(
      legend: "Example radio group",
      name: "radio-buttons-optional",
      options: {
        optional: true
      }
    ) do |c|
      c.with_inputs(radios)
    end
  end

  def hint
    render CitizensAdviceComponents::RadioGroup.new(
      legend: "Example radio group",
      name: "radio-buttons-hint",
      options: {
        hint: "This is the hint text"
      }
    ) do |c|
      c.with_inputs(radios)
    end
  end

  def small
    render CitizensAdviceComponents::RadioGroup.new(
      legend: "Example radio group",
      name: "radio-buttons-small",
      options: {
        size: :small
      }
    ) do |c|
      c.with_inputs(radios)
    end
  end

  def inline
    render CitizensAdviceComponents::RadioGroup.new(
      legend: "Example radio group",
      name: "radio-buttons-inline",
      options: {
        layout: :inline
      }
    ) do |c|
      c.with_inputs(radios)
    end
  end

  def long
    render CitizensAdviceComponents::RadioGroup.new(
      legend: "Example radio group",
      name: "radio-buttons-long"
    ) do |c|
      c.with_inputs(long_radios)
    end
  end

  def additional_attributes
    render CitizensAdviceComponents::RadioGroup.new(
      legend: "Example radio group",
      name: "radio-buttons-attrs"
    ) do |c|
      c.with_inputs(additional_attribute_radios)
    end
  end

  def page_heading
    render CitizensAdviceComponents::RadioGroup.new(
      legend: "Example page heading radio group",
      name: "radio-buttons-page-heading",
      options: { page_heading: true }
    ) do |c|
      c.with_inputs(radios)
    end
  end

  private

  def radios
    [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" }
    ]
  end

  def long_radios
    [
      { label: "This option is pretty long and will probably wrap over multiple lines", value: "1" },
      { label: "This option is also pretty long, too long even, and will almost definitely wrap over multiple lines", value: "2" }
    ]
  end

  def additional_attribute_radios
    [
      { label: "Option 1", value: "1", "data-testid": "first-input" },
      { label: "Option 2", value: "2", "data-testid": "second-input" }
    ]
  end
end
