# frozen_string_literal: true

module CitizensAdviceComponents
  class CheckboxGroup < FormGroup
    renders_many :inputs, Checkable::Checkbox

    def fieldset_classes
      common_fieldset_classes << "cads-checkbox-group"
    end
  end
end
