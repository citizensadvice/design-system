# frozen_string_literal: true

module CitizensAdviceComponents
  module Legacy
    class CheckboxGroup < FormGroup
      renders_many :inputs, Checkable::Checkbox

      def extra_fieldset_classes
        ["cads-form-group--checkbox"]
      end
    end
  end
end
