# frozen_string_literal: true

require "active_support/core_ext/module/delegation"

module CitizensAdviceComponents
  module Elements
    class Base
      include ActionView::Context

      delegate :content_tag, :tag, :safe_join, :link_to, :capture, to: :@template

      attr_reader :template, :object, :attribute
      attr_accessor :options

      def initialize(template, object, attribute, **kwargs)
        @template = template
        @object = object
        @attribute = attribute

        @options = kwargs.with_defaults(default_options)
      end

      def render
        # NO OP
      end

      private

      def current_value
        object.send(attribute)
      end

      def default_options
        {}
      end

      def error_message
        object.errors.full_messages_for(attribute)&.first
      end

      def object_name
        object.to_model.model_name.singular
      end

      def field_name
        template.field_name(object_name, attribute)
      end

      def field_id
        template.field_id(object_name, attribute)
      end

      def label
        options[:label] || object.class.human_attribute_name(attribute)
      end

      def hint
        options[:hint]
      end

      def optional
        !!!options[:required]
      end

      def error?
        error_message.present?
      end

      def error_marker
        return "" unless error?

        tag.div(class: "cads-form-field__error-marker")
      end

      def form_field_classes
        class_names("cads-form-field", "cads-form-field--has-error": error?)
      end
    end
  end
end
