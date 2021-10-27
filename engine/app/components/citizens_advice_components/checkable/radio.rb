module CitizensAdviceComponents
  module Checkable 
    class Radio < Base
      def initialize(label:, value:, checked: false, **additional_attributes)
        super(label: label, value: value, checked: checked, **additional_attributes)
      end

      def input_type
        "radio"
      end
    end
  end
end