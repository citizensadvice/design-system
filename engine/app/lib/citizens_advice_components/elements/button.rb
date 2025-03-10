# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class Button < Base
      def initialize(template, object, button_text: nil, **)
        super(template, object, nil, **)

        @button_text = button_text
        @icon_left = options[:icon_left]
        @icon_right = options[:icon_right]

        @options.except!(:icon_left, :icon_right)
      end

      def render
        component = CitizensAdviceComponents::Button.new(**options)
        component.with_content(@button_text)

        add_icon_left(component) if @icon_left
        add_icon_right(component) if @icon_right

        component.render_in(@template)
      end

      private

      def default_options
        { type: :submit, variant: :primary }
      end

      def add_icon_left(component)
        component.with_icon_left do
          icon_left_class.new.render_in(@template)
        end
      end

      def add_icon_right(component)
        component.with_icon_right do
          icon_right_class.new.render_in(@template)
        end
      end

      def icon_left_class
        "CitizensAdviceComponents::Icons::#{@icon_left.to_s.camelize}".constantize
      end

      def icon_right_class
        "CitizensAdviceComponents::Icons::#{@icon_right.to_s.camelize}".constantize
      end
    end
  end
end
