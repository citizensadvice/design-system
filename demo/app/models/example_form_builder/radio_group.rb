# frozen_string_literal: true

module ExampleFormBuilder
  class RadioGroup < WizardSteps::Step
    Option = Data.define(:name, :id)

    attribute :favourite_drink

    validates :favourite_drink, presence: true, inclusion: { in: ->(step) { step.drinks.map(&:id) } }

    def drinks
      [
        Option.new(id: "tea", name: "Tea"),
        Option.new(id: "coffee", name: "Coffee"),
        Option.new(id: "water", name: "Water")
      ]
    end
  end
end
