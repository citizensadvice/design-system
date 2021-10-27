module CitizensAdviceComponents
  module Checkable 
    class Base < CitizensAdviceComponents::Base
      attr_reader :label

      def initialize(label:, value:, checked: false, **additional_attributes)
        super
        @label = label
        @value = value
        @checked = fetch_or_fallback_boolean(checked, fallback: false)
        @additional_attributes = additional_attributes
      end

      def attributes(name)
        attrs = base_attributes(name)
        return attrs if @additional_attributes.blank?

        attrs.merge(@additional_attributes)
      end

      def input_type
        raise NotImplementedError
      end

      def base_attributes(name)
        {
          type: input_type,
          id: format_button_id(name),
          name: name,
          value: @value,
          checked: @checked
        }
      end

      def format_button_id(name)
        "#{name}-#{@value}"
      end
    end
  end
end