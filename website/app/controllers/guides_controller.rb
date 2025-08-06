# frozen_string_literal: true

class GuidesController < ApplicationController
  before_action :set_guides, :set_breadcrumbs

  def index; end

  def show
    @guide = Guide.find(params[:slug])
    cads_add_breadcrumb title: @guide.title
    set_meta_tags title: [t("sections.guides"), @guide.title]
  end

  private

  def set_guides
    @guides = Guide.glob("*").sort_by(&:order)
  end

  def set_breadcrumbs
    cads_add_breadcrumb title: t("sections.guides"), url: guides_path
  end
end
