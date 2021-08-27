# frozen_string_literal: true
module CitizensAdviceComponents
  module Icons
    class Plus < CitizensAdviceComponents::Icons::Base 
      attr_reader :size

      def initialize(size: nil)
        super
      end
    end
  end
end
