# frozen_string_literal: true

Rails.application.routes.draw do
  scope "(/:locale)", locale: /#{I18n.available_locales.join('|')}/ do
    root to: "home#index", as: :home

    get "/content-sample", to: "example_page#show", as: "content_sample"

    scope "/form-sample", as: "example_form" do
      get "/", to: "example_form#new", as: "new"
      post "/", to: "example_form#create", as: "create"
      get "/success", to: "example_form#success", as: "success"
    end
  end
end
