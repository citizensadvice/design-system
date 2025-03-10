# frozen_string_literal: true

module Breadcrumbs
  extend ActiveSupport::Concern

  included do
    helper_method :breadcrumbs
    def breadcrumbs
      @breadcrumbs ||= default_breadcrumbs
    end
  end

  protected

  def add_breadcrumbs(crumbs)
    breadcrumbs.concat(crumbs)
  end

  private

  def default_breadcrumbs
    [{
      title: I18n.t("global.home"),
      url: home_path
    }]
  end
end
