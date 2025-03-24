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
        # We still support Rails 6.1 but rely on the use of field_name
        # so we provide a shim for this method for older versions of Rails.
        if Rails::VERSION::MAJOR < 7
          field_name_shim(object_name, attribute)
        else
          template.field_name(object_name, attribute)
        end
      end

      def field_id
        # We still support Rails 6.1 but rely on the use of field_id
        # so we provide a shim for this method for older versions of Rails.
        if Rails::VERSION::MAJOR < 7
          field_id_shim(object_name, attribute)
        else
          template.field_id(object_name, attribute)
        end
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

      # https://github.com/rails/rails/blob/main/actionview/lib/action_view/helpers/form_tag_helper.rb#L102
      def field_id_shim(object_name, method_name, *suffixes, index: nil, namespace: nil)
        object_name = object_name.model_name.singular if object_name.respond_to?(:model_name)

        sanitized_object_name = object_name.to_s.gsub(/\]\[|[^-a-zA-Z0-9:.]/, "_").delete_suffix("_")

        sanitized_method_name = method_name.to_s.delete_suffix("?")

        [
          namespace,
          sanitized_object_name.presence,
          (index unless sanitized_object_name.empty?),
          sanitized_method_name,
          *suffixes
        ].tap(&:compact!).join("_")
      end

      # https://github.com/rails/rails/blob/main/actionview/lib/action_view/helpers/form_tag_helper.rb#L132
      def field_name_shim(object_name, method_name, *method_names, multiple: false, index: nil)
        names = method_names.map! { |name| "[#{name}]" }.join

        # a little duplication to construct fewer strings
        if object_name.blank?
          "#{method_name}#{names}#{multiple ? '[]' : ''}"
        elsif index
          "#{object_name}[#{index}][#{method_name}]#{names}#{multiple ? '[]' : ''}"
        else
          "#{object_name}[#{method_name}]#{names}#{multiple ? '[]' : ''}"
        end
      end
    end
  end
end
