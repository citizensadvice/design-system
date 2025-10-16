# frozen_string_literal: true

class FoundationsController < ApplicationController
  before_action :set_foundations, :set_breadcrumbs

  def index; end

  def show
    @foundation = Foundation.find(params[:slug])
    cads_add_breadcrumb title: @foundation.title
    set_meta_tags title: [t("sections.foundations.title"), @foundation.title]
  end

  private

  def set_foundations
    @foundations = Foundation.glob("*")
  end

  def set_breadcrumbs
    cads_add_breadcrumb title: t("sections.foundations.title"), url: foundations_path
  end
end
