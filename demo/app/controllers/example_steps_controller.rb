# frozen_string_literal: true

class ExampleStepsController < ApplicationController
  include WizardSteps

  before_action :set_breadcrumbs

  self.wizard_class = ExampleWizard

  def start; end

  def show; end

  def success; end

  helper_method :previous_step_url

  def previous_step_url
    if wizard.previous_key
      wizard_steps_example_step_path(wizard.previous_key)
    else
      wizard_steps_example_start_path
    end
  end

  private

  def set_breadcrumbs
    cads_add_breadcrumb title: "Form"
  end

  def step_path(step = params[:id])
    wizard_steps_example_step_path(id: step)
  end

  def wizard_store_key
    :wizard_steps_example
  end

  def on_complete(_response)
    redirect_to wizard_steps_example_success_path
  end
end
