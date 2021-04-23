# frozen_string_literal: true

Rails.application.routes.draw do
  scope "(/:locale)" do
    root to: "home#index"
  end
end
