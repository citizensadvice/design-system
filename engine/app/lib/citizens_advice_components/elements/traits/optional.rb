# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    module Traits
      module Optional
        attr_reader :options

        def render_optional
          return if required?

          tag.span(class: "cads-form-field__optional") do
            "(#{I18n.t('citizens_advice_components.input.optional')})"
          end
        end

        def required?
          options[:required].present?
        end
      end
    end
  end
end
