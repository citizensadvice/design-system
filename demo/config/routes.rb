# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "home#index"
  get "/:locale", to: "home#index"
end
