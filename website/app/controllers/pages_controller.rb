# frozen_string_literal: true

class PagesController < ApplicationController
  def show
    @page = Page.find(params[:slug])
    cads_add_breadcrumb title: @page.title
    set_meta_tags title: [@page.title]
  end
end
