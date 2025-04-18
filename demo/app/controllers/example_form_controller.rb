# frozen_string_literal: true

class ExampleFormController < ApplicationController
  def new
    @form = ExampleForm.new
  end

  def create
    @form = ExampleForm.new(form_params)
    if @form.valid?
      redirect_to example_form_success_path
    else
      render :new
    end
  end

  def success; end

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
