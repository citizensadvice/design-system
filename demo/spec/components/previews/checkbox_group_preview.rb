# frozen_string_literal: true

class CheckboxGroupPreview < ViewComponent::Preview
  def basic
    render CitizensAdviceComponents::CheckboxGroup.new(
      legend: "This is the group legend",
      name: "my-radio-group"
    ) do |c|
      c.with_inputs(checkboxes)
    end
  end

  def error
    render CitizensAdviceComponents::CheckboxGroup.new(
      legend: "Example checkbox group",
      name: "checkbox-buttons-error",
      options: {
        error_message: "Select an option"
      }
    ) do |c|
      c.with_inputs(checkboxes)
    end
  end

  def optional
    render CitizensAdviceComponents::CheckboxGroup.new(
      legend: "Example checkbox group",
      name: "checkbox-buttons-optional",
      options: {
        optional: true
      }
    ) do |c|
      c.with_inputs(checkboxes)
    end
  end

  def hint
    render CitizensAdviceComponents::CheckboxGroup.new(
      legend: "Example checkbox group",
      name: "checkbox-buttons-hint",
      options: {
        hint: "This is the hint text"
      }
    ) do |c|
      c.with_inputs(checkboxes)
    end
  end

  def long
    render CitizensAdviceComponents::CheckboxGroup.new(
      legend: "Example checkbox group",
      name: "checkbox-buttons-long"
    ) do |c|
      c.with_inputs(long_checkboxes)
    end
  end

  def additional_attributes
    render CitizensAdviceComponents::CheckboxGroup.new(
      legend: "Example checkbox group",
      name: "checkbox-buttons-attrs"
    ) do |c|
      c.with_inputs(additional_attribute_checkboxes)
    end
  end

  private

  def checkboxes
    [
      { label: "Option 1", value: 1, checked: true },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 }
    ]
  end

  def long_checkboxes
    [
      { label: "This option is pretty long and will probably wrap over multiple lines", value: "1" },
      { label: "This option is also pretty long, too long even, and will almost definitely wrap over multiple lines", value: "2" }
    ]
  end

  def additional_attribute_checkboxes
    [
      { label: "Option 1", value: "1", "data-testid": "first-input" },
      { label: "Option 2", value: "2", "data-testid": "second-input" }
    ]
  end
end
