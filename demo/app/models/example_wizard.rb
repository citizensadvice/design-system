# frozen_string_literal: true

class ExampleWizard < WizardSteps::Base
  attr_reader :store

  self.steps = [
    ExampleSteps::TextArea,
    ExampleSteps::ReviewAnswers
  ].freeze

  def step_path(step_key)
    Rails.application.routes.url_helpers.wizard_steps_example_step_path(id: step_key)
  end

  def do_complete
    # TODO
  end
end
