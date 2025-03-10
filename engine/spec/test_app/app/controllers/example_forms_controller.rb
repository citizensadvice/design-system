# frozen_string_literal: true

class ExampleFormsController < ApplicationController
  def index
    @person = Person.new
  end

  def create
    @person = Person.new(person_params)
    @person.valid?

    render :index
  end

  private

  def person_params
    params.require(:person).permit(:first_name, :last_name)
  end
end
