# frozen_string_literal: true

module CitizensAdviceComponents
  module Icons
    class SvgIcon < CitizensAdviceComponents::Base
      attr_reader :size

      def initialize(size: nil, icon_name: nil)
        super
        @size = fetch_or_fallback(allowed_values: [nil, :small, :large], given_value: size, fallback: nil)
        @icon_name = icon_name
      end

      def css_classes
        ["cads-icon", "cads-icon--#{@size}", "cads-icon--#{@icon_name}"].join(" ")
      end
    end
  end
end
