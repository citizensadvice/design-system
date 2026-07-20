# frozen_string_literal: true

module CitizensAdviceComponents
  module Legacy
    class FormGroup < Base
      attr_reader :legend, :name, :id, :error_message, :hint, :size, :layout

      def initialize(legend:, name:, id: nil, options: nil)
        @legend = legend
        @name = name
        @id = id

        set_options(options)
      end

      def set_options(options)
        return if options.blank?

        @error_message = options[:error_message]
        @hint = options[:hint]
        @optional = fetch_or_fallback_boolean(options[:optional], fallback: false)
        @legend_heading = fetch_or_fallback_boolean(options[:legend_heading], fallback: false)
        @page_heading = fetch_or_fallback_boolean(options[:page_heading], fallback: false)
      end

      def extra_fieldset_classes
        []
      end

      private

      def fieldset_classes
        common_fieldset_classes << extra_fieldset_classes
      end

      def common_fieldset_classes
        %w[cads-form-group]
      end

      def render?
        inputs.present?
      end

      def error?
        @error_message.present?
      end

      def error_id
        "#{name}-error"
      end

      def optional?
        @optional.present?
      end

      def hint?
        @hint.present?
      end

      def page_heading?
        @legend_heading.presence || @page_heading
      end
    end
  end
end
