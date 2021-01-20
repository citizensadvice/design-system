# frozen_string_literal: true
class ApplicationController < ActionController::Base
  around_action :with_locale

  def with_locale(&action)
    locale = params[:locale] == "cymraeg" ? :cy : I18n.default_locale
    I18n.with_locale(locale, &action)
  end
end
