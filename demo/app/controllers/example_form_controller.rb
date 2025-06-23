# frozen_string_literal: true

class ExampleFormController < ApplicationController
  before_action :mimic_signed_in

  def new
    @form = ExampleForm.new
    cads_add_breadcrumb title: "Form"
  end

  def create
    @form = ExampleForm.new(form_params)
    if @form.valid?
      redirect_to example_form_success_path
    else
      cads_add_breadcrumb title: "Form"
      render :new
    end
  end

  def success
    cads_add_breadcrumb title: "Form", url: example_form_new_path
    cads_add_breadcrumb title: "Thank you for your submission"
  end

  private

  def mimic_signed_in
    @signed_in = true
  end

  def form_params
    params.expect(
      example_form: %i[
        first_name
        last_name
        your_enquiry
        total_amount
        date_of_purchase
        contacted_trader
        trader_response
      ]
    )
  end
end
