# frozen_string_literal: true

class ExamplesController < ApplicationController
  layout "component_example"

  def index
    redirect_to components_path
  end

  def show
    @example = ComponentExample.find("#{params[:category]}/#{params[:slug]}")
  end
end
