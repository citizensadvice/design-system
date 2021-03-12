# frozen_string_literal: true

Rails.application.routes.draw do
  scope "(/:locale)" do
    root to: "home#index"

    scope "/example-pages" do
      get "/kitchen-sink", to: "example_pages#kitchen_sink"
    end
  end
end
