# frozen_string_literal: true

# This controller is intended for top-level pages like /accessibility
# for new sections add a dedicated controller and model for your content
class PagesController < ApplicationController
  def show
    @page = Page.find(params[:slug])
    cads_add_breadcrumb title: @page.title
    set_meta_tags title: [@page.title]
  end
end
