# frozen_string_literal: true

class ComponentsController < ApplicationController
  before_action :set_components, :set_breadcrumbs

  def index; end

  def show
    @component = Component.find(params[:slug])
    cads_add_breadcrumb title: @component.title
    set_meta_tags title: [t("sections.components"), @component.title]
  end

  private

  def set_components
    @components = Component.glob("*")
  end

  def set_breadcrumbs
    cads_add_breadcrumb title: t("sections.components"), url: components_path
  end
end
