# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    module Collections
      class Base < CitizensAdviceComponents::Elements::Base
        include ActionView::Helpers::FormOptionsHelper

        private

        def text_method
          @options[:text_method]
        end

        def value_method
          @options[:value_method] || text_method
        end

        def legend_html
          tag.legend(class: "cads-form-field__label") { label_html }
        end

        def label_html
          if options[:page_heading].present?
            tag.h1(class: "cads-page-title") { label }
          else
            safe_join([label, " ", optional_html])
          end
        end

        def hint_html
          return if hint.nil?

          tag.p(class: "cads-form-field__hint") { hint }
        end

        def error_message_html
          return unless error?

          tag.p(class: "cads-form-field__error-message", id: error_id) { error_message }
        end

        def optional_html
          return unless optional

          tag.span(class: "cads-form-field__optional") do
            "(#{I18n.t('citizens_advice_components.input.optional')})"
          end
        end

        def hint_id
          "#{field_id}-hint"
        end

        def error_id
          "#{field_id}-error"
        end

        def item_id(index)
          if index.zero?
            "#{field_id}-input"
          else
            "#{field_id}-#{index}"
          end
        end
      end
    end
  end
end
