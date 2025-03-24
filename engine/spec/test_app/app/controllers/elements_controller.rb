# frozen_string_literal: true

class ElementsController < ApplicationController
  def index
    @person = Person.new

    render params[:element]
  end

  def create
    @person = Person.new(person_params)
    @person.valid?

    render params[:element]
  end

  private

  def person_params
    params.require(:person).permit!
  end
end
