# frozen_string_literal: true

module DesignSystem
  class AssetHyperlinkComponent < ViewComponent::Base
    attr_reader :uri, :description, :size

    def initialize(uri:, description:, size:)
      super
      @uri = uri
      @description = description
      @size = size
    end
  end
end
