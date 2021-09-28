# frozen_string_literal: true

module CitizensAdviceComponents
  module Icons
    class Base < CitizensAdviceComponents::Base
      attr_reader :size
      
      def initialize(size: nil)
        super
        @size = fetch_or_fallback(allowed_values: [nil, :small, :large], given_value: size, fallback: nil)
      end

      def css_classes
        ["cads-icon", "cads-icon--#{@size}", "cads-icon--#{human_class_name}"].join(" ")
      end

      def human_class_name
        self.class.name.demodulize.underscore.dasherize
      end
    end
  end
end
