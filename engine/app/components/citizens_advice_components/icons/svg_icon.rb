# frozen_string_literal: true

module CitizensAdviceComponents
  module Icons
    class SvgIcon < CitizensAdviceComponents::Base
      attr_reader :size, :icon_name

      def initialize(size:, icon_name:)
        super
        @size = fetch_or_fallback(
          allowed_values: %i[small large],
          given_value: size,
          fallback: :small
        )
        @icon_name = icon_name
      end

      def call
        tag.svg(
          content,
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 16 16",
          class: %W[cads-icon cads-icon--#{size} cads-icon--#{icon_name}],
          focusable: false,
          "aria-hidden": true
        )
      end
    end
  end
end
