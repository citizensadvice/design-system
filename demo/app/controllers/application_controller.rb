# frozen_string_literal: true

class ApplicationController < ActionController::Base
  around_action :with_locale

  helper_method :header_links

  def with_locale(&action)
    locale = params[:locale] == "cymraeg" ? :cy : I18n.default_locale
    I18n.with_locale(locale, &action)
  end

  def header_links
    [alternate_language_link]
  end

  private

  def alternate_language_link
    if I18n.locale == :cy
      { title: "English", url: url_for(only_path: true) }
    else
      { title: "Cymraeg", url: url_for(only_path: true, locale: "cymraeg") }
    end
  end
end
