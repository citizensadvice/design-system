# frozen_string_literal: true

module CitizensAdviceComponents
  class RadioGroupPreview < ViewComponent::Preview
    def basic
      render CitizensAdviceComponents::RadioGroup.new(
        legend: "Example radio group",
        name: "radio-buttons"
      ) do |c|
        c.radio_buttons(radios)
      end
    end

    def error
      render CitizensAdviceComponents::RadioGroup.new(
        legend: "Example radio group",
        name: "radio-buttons",
        options: {
          error_message: "Select an option"
        }
      ) do |c|
        c.radio_buttons(radios)
      end
    end

    def optional
      render CitizensAdviceComponents::RadioGroup.new(
        legend: "Example radio group",
        name: "radio-buttons",
        options: {
          optional: true
        }
      ) do |c|
        c.radio_buttons(radios)
      end
    end

    def hint
      render CitizensAdviceComponents::RadioGroup.new(
        legend: "Example radio group",
        name: "radio-buttons",
        options: {
          hint: "This is the hint text"
        }
      ) do |c|
        c.radio_buttons(radios)
      end
    end

    def small
      render CitizensAdviceComponents::RadioGroup.new(
        legend: "Example radio group",
        name: "radio-buttons",
        options: {
          size: :small
        }
      ) do |c|
        c.radio_buttons(radios)
      end
    end

    def inline
      render CitizensAdviceComponents::RadioGroup.new(
        legend: "Example radio group",
        name: "radio-buttons",
        options: {
          layout: :inline
        }
      ) do |c|
        c.radio_buttons(radios)
      end
    end

    def long
      render CitizensAdviceComponents::RadioGroup.new(
        legend: "Example radio group",
        name: "radio-buttons"
      ) do |c|
        c.radio_buttons(long_radios)
      end
    end

    def additional_attributes
      render CitizensAdviceComponents::RadioGroup.new(
        legend: "Example radio group",
        name: "radio-buttons"
      ) do |c|
        c.radio_buttons(additional_attribute_radios)
      end
    end

    private

    def radios
      [
        { label: "Option 1", value: "1", name: "radio-group" },
        { label: "Option 2", value: "2", name: "radio-group" }
      ]
    end

    def long_radios
      [
        { label: "This option is pretty long and will probably wrap over multiple lines", value: "1", name: "radio-group" },
        { label: "This option is also pretty long, too long even, and will almost definitely wrap over multiple lines", value: "2", name: "radio-group" }
      ]
    end

    def additional_attribute_radios
      [
        { label: "Option 1", value: "1", name: "radio-group", "data-testid": "first-input" },
        { label: "Option 2", value: "2", name: "radio-group", "data-testid": "second-input" }
      ]
    end
  end
end
