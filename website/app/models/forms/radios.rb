# frozen_string_literal: true

module Forms
  class Radios
    Option = Data.define(:name, :id)

    include ActiveModel::Model
    include ActiveModel::Attributes

    attribute :radios
    attribute :radios_hint
    attribute :radios_required
    attribute :radios_inline
    attribute :radios_small
    attribute :radios_page_heading

    validates :radios_required, presence: true, inclusion: { in: ->(radios) { radios.options.map(&:id) } }

    def options
      [
        Option.new(id: "option_1", name: "Option 1"),
        Option.new(id: "option_2", name: "Option 2"),
        Option.new(id: "option_3", name: "Option 3")
      ]
    end

    def self.valid_example
      new(radios_required: "option_1")
    end

    def self.invalid_example
      model = new(radios_required: "invalid")
      # Trigger validation to show error messages
      model.valid?
      model
    end
  end
end
