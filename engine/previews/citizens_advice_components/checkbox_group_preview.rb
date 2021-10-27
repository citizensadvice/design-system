# frozen_string_literal: true

module CitizensAdviceComponents
  class CheckboxGroupPreview < ViewComponent::Preview
    def basic
      render CheckboxGroup.new(
        legend: "This is the group legend",
        name: "my-radio-group"
      ) do |c|
        c.checkboxes(checkboxes)
      end
    end

    def error
      render CheckboxGroup.new(
        legend: "Example radio group",
        name: "radio-buttons-error",
        options: {
          error_message: "Select an option"
        }
      ) do |c|
        c.checkboxes(checkboxes)
      end
    end

    def optional
      render CheckboxGroup.new(
        legend: "Example radio group",
        name: "radio-buttons-optional",
        options: {
          optional: true
        }
      ) do |c|
        c.checkboxes(checkboxes)
      end
    end

    def hint
      render CheckboxGroup.new(
        legend: "Example radio group",
        name: "radio-buttons-hint",
        options: {
          hint: "This is the hint text"
        }
      ) do |c|
        c.checkboxes(checkboxes)
      end
    end

    def long
      render CheckboxGroup.new(
        legend: "Example radio group",
        name: "radio-buttons-long"
      ) do |c|
        c.checkboxes(long_checkboxes)
      end
    end

    def additional_attributes
      render CheckboxGroup.new(
        legend: "Example radio group",
        name: "radio-buttons-attrs"
      ) do |c|
        c.checkboxes(additional_attribute_checkboxes)
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
end
