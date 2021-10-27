module CitizensAdviceComponents
  module Checkable 
    class Checkbox < Base
      def initialize(label:, value:, checked: false, **additional_attributes)
        super(label: label, value: value, checked: checked, **additional_attributes)
      end

      def input_type
        "checkbox"
      end
    end
  end
end