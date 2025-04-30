# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include CitizensAdviceComponents::Helpers

  default_form_builder CitizensAdviceComponents::FormBuilder

  include Breadcrumbs

  around_action :with_locale

  def with_locale(&)
    I18n.with_locale(params[:locale] || I18n.default_locale, &)
  end
end
