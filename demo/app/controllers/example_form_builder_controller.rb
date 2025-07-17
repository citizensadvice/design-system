# frozen_string_literal: true

class ExampleFormBuilderController < ApplicationController
  include WizardSteps

  before_action :set_breadcrumbs

  self.wizard_class = ExampleWizard

  def start; end

  def show; end

  def success; end

  helper_method :previous_step_url

  def previous_step_url
    if wizard.previous_key
      example_form_builder_step_path(id: wizard.previous_key)
    else
      example_form_builder_start_path
    end
  end

  private

  def set_breadcrumbs
    cads_add_breadcrumb title: "Form"
  end

  def step_path(step = params[:id])
    example_form_builder_step_path(id: step)
  end

  def wizard_store_key
    :wizard_steps_example
  end

  def on_complete(_response)
    redirect_to example_form_builder_success_path
  end
end
