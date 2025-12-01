# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    class Base
      include CitizensAdviceComponents::FetchOrFallbackHelper
      include ActionView::Helpers::TagHelper

      attr_reader :builder, :template, :object

      def initialize(
        builder,
        template,
        object
      )
        @builder = builder
        @template = template
        @object = object
      end
    end
  end
end
