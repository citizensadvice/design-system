# frozen_string_literal: true

module CitizensAdviceComponents
  module Icons
    class Base < CitizensAdviceComponents::Base
      attr_reader :size

      def initialize(size: :small)
        @size = fetch_or_fallback(
          allowed_values: %i[small large],
          given_value: size,
          fallback: :small
        )
      end

      def icon_name
        raise NotImplementedError
      end
    end
  end
end
