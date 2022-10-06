# frozen_string_literal: true

module CitizensAdviceComponents
  module Checkable
    class Base < CitizensAdviceComponents::Base
      attr_reader :label

      def initialize(label:, value:, checked: false, **additional_attributes)
        @label = label
        @value = value
        @checked = fetch_or_fallback_boolean(checked, fallback: false)
        @additional_attributes = additional_attributes
      end

      def attributes(name, index = 0, error: false)
        @name = name
        @index = index
        attrs = base_attributes
        attrs = base_attributes.merge(@additional_attributes) if @additional_attributes.present?
        attrs = attrs.merge(error_attributes) if error
        attrs
      end

      def input_type
        raise NotImplementedError
      end

      def base_attributes
        {
          type: input_type,
          id: format_button_id,
          name: @name,
          value: @value,
          checked: @checked
        }
      end

      def error_attributes
        {
          "aria-describedby": "#{@name}-error",
          "aria-invalid": true
        }
      end

      def format_button_id
        "#{@name}-#{@index}"
      end
    end
  end
end
