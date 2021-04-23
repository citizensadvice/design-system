# frozen_string_literal: true

module CitizensAdviceComponents
  class AssetHyperlinkComponent < ViewComponent::Base
    attr_reader :href, :description, :size

    def initialize(href:, description:, size:)
      super
      @href = href
      @description = description
      @size = size
    end
  end
end
