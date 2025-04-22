# frozen_string_literal: true

Rails.application.routes.draw do
  scope "(/:locale)", locale: /#{I18n.available_locales.join('|')}/ do
    root to: "home#index"

    get "/content-sample", to: "example_page#show", as: "content_sample"

    scope "/form-sample", as: "example_form" do
      get "/", to: "example_form#new", as: "new"
      post "/", to: "example_form#create", as: "create"
      get "/success", to: "example_form#success", as: "success"
    end

    scope "/wizard-steps-example", as: "wizard_steps_example" do
      root to: "example_steps#start"
      resources :steps, only: %i[index show update], controller: "example_steps"
    end
  end
end
