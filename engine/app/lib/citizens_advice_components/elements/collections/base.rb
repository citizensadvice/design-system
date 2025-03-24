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
          tag.legend(class: "cads-form-field__label") { safe_join([label, " ", optional_html]) }
        end

        def hint_html
          return if hint.nil?

          tag.p(class: "cads-form-field__hint") { hint }
        end

        def error_message_html
          return unless error?

          tag.p(class: "cads-form-field__error-message") { error_message }
        end

        def optional_html
          return unless optional

          tag.span(class: "cads-form-field__optional") { "(optional)" }
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
