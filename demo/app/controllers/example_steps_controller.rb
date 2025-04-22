# frozen_string_literal: true

class ExampleStepsController < ApplicationController
  include WizardSteps
  self.wizard_class = ExampleWizard

  def start; end

  def show; end

  def completed
    # TODO: Add a completed page
  end

  helper_method :previous_step_url

  def previous_step_url
    if wizard.previous_key
      wizard_steps_example_step_path(wizard.previous_key)
    else
      wizard_steps_example_root_path
    end
  end

  private

  def step_path(step = params[:id])
    wizard_steps_example_step_path(id: step)
  end

  def wizard_store_key
    :wizard_steps_example
  end
end
