# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class Base
      include ActionView::Helpers::TagHelper
      include FetchOrFallbackHelper

      attr_reader :builder, :template, :object, :object_name

      def initialize(
        builder,
        template,
        object,
        object_name
      )
        @builder = builder
        @template = template
        @object = object
        @object_name = object_name
      end
    end
  end
end
