# frozen_string_literal: true

Rails.application.routes.draw do
  root "home#index", as: :home
  resources :guides, only: %i[index show], param: :slug
  resources :foundations, only: %i[index show], param: :slug
  resources :components, only: %i[index show], param: :slug
  get "/examples", to: "examples#index", as: :examples
  get "/examples/:category/:slug", to: "examples#show", as: :example
  get "/*slug", to: "pages#show", as: :page, format: :html
  match "/404", to: "errors#not_found", via: :all
end
