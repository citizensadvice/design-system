# frozen_string_literal: true

class ExamplePageController < ApplicationController
  def show
    cads_add_breadcrumb title: "Advice collection"
  end
end
