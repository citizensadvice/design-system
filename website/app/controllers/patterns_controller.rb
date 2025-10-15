# frozen_string_literal: true

class PatternsController < ApplicationController
  before_action :set_patterns, :set_breadcrumbs

  def index; end

  def show
    @pattern = Pattern.find(params[:slug])
    cads_add_breadcrumb title: @pattern.title
    set_meta_tags title: [t("sections.patterns"), @pattern.title]
  end

  private

  def set_patterns
    @patterns = Pattern.glob("*").sort_by(&:order)
  end

  def set_breadcrumbs
    cads_add_breadcrumb title: t("sections.patterns"), url: patterns_path
  end
end
