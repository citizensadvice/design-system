# frozen_string_literal: true

module Forms
  class Checkbox
    include ActiveModel::Model
    include ActiveModel::Attributes

    attribute :checkbox, :boolean
    attribute :checkbox_required, :boolean

    validates :checkbox_required, presence: true

    def self.valid_example
      new(checkbox: false, checkbox_required: true)
    end

    def self.invalid_example
      model = new(checkbox: nil, checkbox_required: false)
      # Trigger validation to show error messages
      model.valid?
      model
    end
  end
end
