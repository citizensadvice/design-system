# frozen_string_literal: true

module ExampleFormBuilder
  class RadioGroup < WizardSteps::Step
    attribute :favourite_drink, array: true
  end
end
