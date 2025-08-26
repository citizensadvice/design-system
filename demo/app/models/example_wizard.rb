# frozen_string_literal: true

class ExampleWizard < WizardSteps::Base
  attr_reader :store

  self.steps = [
    ExampleFormBuilder::TextField,
    ExampleFormBuilder::TextFieldPageHeading,
    ExampleFormBuilder::TextArea,
    ExampleFormBuilder::DateField,
    ExampleFormBuilder::RadioGroup
  ].freeze

  def do_complete; end
end
