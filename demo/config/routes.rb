# frozen_string_literal: true

Rails.application.routes.draw do
  scope "(/:locale)", locale: /#{I18n.available_locales.join("|")}/ do
    root to: "home#index"

    get "/pages/:id" => "high_voltage/pages#show", :as => :page, :format => false
  end
end
