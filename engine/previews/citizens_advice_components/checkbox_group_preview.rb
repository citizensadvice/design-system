# frozen_string_literal: true
module CitizensAdviceComponents
  class CheckboxGroupPreview < ViewComponent::Preview
    def default
      render CheckboxGroup.new(
        legend: "This is the group legend",
        name: "my-radio-group"
      ) do |c|
        c.checkboxes(checkboxes)
      end
    end

    private
    
    def checkboxes 
      [
        { label: "Option 1", value: 1},
        { label: "Option 2", value: 2},
        { label: "Option 3", value: 3}
      ]
    end
  end
end