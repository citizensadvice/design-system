# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    module Traits
      module Hint
        attr_reader :builder, :attribute, :options

        def render_hint
          return if hint.nil?

          tag.p(class: "cads-form-field__hint", id: hint_id) { hint }
        end

        def hint
          options[:hint]
        end

        def hint_id
          # Could refactor to builder.field_id(attribute, :hint)
          "#{builder.field_id(attribute)}-hint"
        end
      end
    end
  end
end
