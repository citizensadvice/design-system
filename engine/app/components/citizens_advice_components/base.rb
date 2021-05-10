# frozen_string_literal: true

module CitizensAdviceComponents
  class Base < ViewComponent::Base
    include FetchOrFallbackHelper
  end
end
