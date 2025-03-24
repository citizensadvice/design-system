# frozen_string_literal: true

class ApplicationController < ActionController::Base
  default_form_builder CitizensAdviceComponents::FormBuilder
end
