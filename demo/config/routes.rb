# frozen_string_literal: true

Rails.application.routes.draw do
  scope "(/:locale)", locale: /#{I18n.available_locales.join("|")}/ do
    root to: "home#index"

    scope "/form-sample", as: "example_form" do
      get "/", to: "example_form#new", as: "new"
      post "/", to: "example_form#create", as: "create"
      get "/success", to: "example_form#success", as: "success"
    end

    get "/:id" => "high_voltage/pages#show", :as => :page, :format => false
  end
end
