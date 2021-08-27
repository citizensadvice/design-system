# frozen_string_literal: true

module CitizensAdviceComponents
  module Icons
    class Base < CitizensAdviceComponents::Base
      def initialize(size: nil)
        super
        @size = fetch_or_fallback(allowed_values: [nil, :small, :large], given_value: size, fallback: nil)
      end

      def size
        return if @size.blank?
        size
      end
    end
  end
end
