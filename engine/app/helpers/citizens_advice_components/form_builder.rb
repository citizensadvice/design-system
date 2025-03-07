# frozen_string_literal: true

module CitizensAdviceComponents
  class FormBuilder < ActionView::Helpers::FormBuilder
    def cads_text_field(attribute, label: nil, hint: nil, required: false, **kwargs)
      Elements::TextInput.new(@template, object, attribute, label: label, required: required, hint: hint, **kwargs).render
    end

    def cads_text_area(attribute, label: nil, hint: nil, required: false, **kwargs)
      Elements::TextArea.new(@template, object, attribute, label: label, required: required, hint: hint, **kwargs).render
    end

    def cads_date_field(attribute, label: nil, hint: nil, required: false, **kwargs)
      Elements::DateInput.new(@template, object, attribute, label: label, required: required, hint: hint, **kwargs).render
    end

    def cads_collection_radio_buttons(attribute, label: nil, hint: nil, required: false, **kwargs)
      Elements::Collections::RadioButtons.new(@template, object, attribute, label: label, hint: hint, required: required, **kwargs).render
    end

    def cads_collection_check_boxes(attribute, label: nil, hint: nil, required: false, **kwargs)
      Elements::Collections::CheckBoxes.new(@template, object, attribute, label: label, hint: hint, required: required, **kwargs).render
    end

    def cads_collection_select(attribute, label: nil, hint: nil, required: false, **kwargs)
      Elements::Collections::Select.new(@template, object, attribute, label: label, hint: hint, required: required, **kwargs).render
    end

    def cads_button(button_text = "Save changes", **kwargs)
      Elements::Button.new(@template, object, button_text: button_text, **kwargs).render
    end

    def cads_error_summary
      Elements::ErrorSummary.new(@template, object, :unused).render
    end

    def cads_check_box(attribute, label: nil, **kwargs)
      Elements::CheckBox.new(@template, object, attribute, label: label, **kwargs).render
    end
  end
end
