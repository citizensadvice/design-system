# frozen_string_literal: true

class ExamplePagesController < ApplicationController
  layout "example_page"

  def kitchen_sink
    @page_title = "Kitchen sink"
  end
end
