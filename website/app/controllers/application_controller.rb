# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include CitizensAdviceComponents::Helpers

  default_form_builder CitizensAdviceComponents::FormBuilder

  protected

  def cads_default_breadcrumbs
    [{ title: t("sections.home"), url: home_path }]
  end
end
