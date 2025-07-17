# frozen_string_literal: true

class ExampleWizard < WizardSteps::Base
  attr_reader :store

  self.steps = [
    ExampleSteps::TextArea
  ].freeze

  def do_complete; end
end
