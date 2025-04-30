# frozen_string_literal: true

# https://viewcomponent.org/guide/previews.html#configuring-preview-controller
# Inherit from application controller to include shared helpers
class PreviewController < ApplicationController
  include ViewComponent::PreviewActions
end
