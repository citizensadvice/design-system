# frozen_string_literal: true

module DesignSystem
  class BaseIconComponent < ViewComponent::Base
    attr_reader :width, :height

    def initialize(
      width:,
      height:
    )
      super
      @width = width
      @height = height
    end

    def svg_attributes
      {
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        width: width,
        height: height,
        viewBox: "0 0 #{width} #{height}",
        aria_hidden: true,
        focusable: false,
        class: "cads-icon-svg"
      }
    end
  end
end
