# frozen_string_literal: true

module Capybara
  module Node
    class Element
      def color
        native.css_value("color")
      end

      def background_color
        native.css_value("background-color")
      end

      def font_weight
        native.css_value("font-weight")
      end

      def vertical_position
        native.rect[:y]
      end
    end
  end
end
