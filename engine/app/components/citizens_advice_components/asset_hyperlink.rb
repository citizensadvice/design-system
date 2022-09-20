# frozen_string_literal: true

module CitizensAdviceComponents
  class AssetHyperlink < Base
    attr_reader :href, :description

    def initialize(href:, description:, size:)
      super
      @href = href
      @description = description
      @size = size
    end

    def size
      number_to_human_size(@size)
    end

    def icon
      render CitizensAdviceComponents::Icons::File.new
    end
  end
end
