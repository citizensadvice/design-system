# frozen_string_literal: true

# Utility for including shared view and controller helpers
# class ApplicationController < ActionController::Base
#   include CitizensAdviceComponents::Helpers
#   [...]
# end
module CitizensAdviceComponents
  module Helpers
    extend ActiveSupport::Concern

    included do
      # Make view helpers available to the application
      helper CitizensAdviceComponents::Engine.helpers
    end
  end
end
