# frozen_string_literal: true

module CitizensAdviceComponents
  module Elements
    module Traits
      module Label
        attr_reader :builder, :attribute, :options

        def label
          options[:label]
        end

        def page_heading?
          options[:page_heading].present?
        end

        def label_id
          # Could refactor to builder.field_id(attribute, :label)
          "#{builder.field_id(attribute)}-label"
        end
      end
    end
  end
end
