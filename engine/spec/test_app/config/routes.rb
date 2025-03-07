# frozen_string_literal: true

Rails.application.routes.draw do
  resources :example_forms, only: %i[index create]

  get "/elements/:element", to: "elements#index", as: :element
  post "/elements/:element", to: "elements#create"
end
