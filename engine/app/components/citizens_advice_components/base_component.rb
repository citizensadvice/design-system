# frozen_string_literal: true

module CitizensAdviceComponents
  class BaseComponent < ViewComponent::Base
    include CitizensAdviceComponents::FetchOrFallbackHelper
  end
end
