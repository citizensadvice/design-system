# frozen_string_literal: true

class ExamplePageController < ApplicationController
  def show
    add_breadcrumbs([{ title: "Advice collection" }])
  end
end
