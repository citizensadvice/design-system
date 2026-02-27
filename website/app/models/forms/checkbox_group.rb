# frozen_string_literal: true

module Forms
  class CheckboxGroup
    Option = Data.define(:name, :id)

    include ActiveModel::Model
    include ActiveModel::Attributes

    attribute :checkbox_group
    attribute :checkbox_group_required
    attribute :checkbox_group_hint
    attribute :checkbox_group_page_heading

    validates :checkbox_group_required, presence: true, inclusion: { in: ->(checkboxes) { checkboxes.options.map(&:id) } }

    def options
      [
        Option.new(id: "option_1", name: "Option 1"),
        Option.new(id: "option_2", name: "Option 2"),
        Option.new(id: "option_3", name: "Option 3")
      ]
    end

    def self.valid_example
      new(checkbox_group_required: "option_1")
    end

    def self.invalid_example
      model = new(checkbox_group_required: "invalid")
      # Trigger validation to show error messages
      model.valid?
      model
    end
  end
end
