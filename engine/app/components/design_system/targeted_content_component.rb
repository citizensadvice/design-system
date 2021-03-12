# frozen_string_literal: true

module DesignSystem
  class TargetedContentComponent < ViewComponent::Base
    attr_reader :type, :id, :title, :heading_level, :body

    def initialize(id:, title:, body:, type: "public", heading_level: 2)
      super

      @type = type
      @id = id
      @title = title.squish
      @heading_level = heading_level.to_i.clamp(2, 4)
      @body = body
    end

    def heading_attributes
      {
        class: %w[cads-targeted-content__title js-cads-targeted-content__title],
        id: "h-#{id}",
        data: { testid: "targeted-content-title" }
      }
    end
  end
end
