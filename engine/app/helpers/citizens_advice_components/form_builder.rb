# frozen_string_literal: true

module CitizensAdviceComponents
  class FormBuilder < ActionView::Helpers::FormBuilder
    def cads_text_field(attribute, label: nil, hint: nil, required: false, **)
      Elements::TextInput.new(@template, object, attribute, label: label, required: required, hint: hint, **).render
    end

    def cads_text_area(attribute, label: nil, hint: nil, required: false, **)
      Elements::TextArea.new(@template, object, attribute, label: label, required: required, hint: hint, **).render
    end

    def cads_date_field(attribute, label: nil, hint: nil, required: false, **)
      Elements::DateInput.new(@template, object, attribute, label: label, required: required, hint: hint, **).render
    end

    def cads_collection_radio_buttons(attribute, label: nil, hint: nil, required: false, **)
      Elements::Collections::RadioButtons.new(@template, object, attribute, label: label, hint: hint, required: required, **).render
    end

    def cads_collection_check_boxes(attribute, label: nil, hint: nil, required: false, **)
      Elements::Collections::CheckBoxes.new(@template, object, attribute, label: label, hint: hint, required: required, **).render
    end

    def cads_collection_select(attribute, label: nil, hint: nil, required: false, **)
      Elements::Collections::Select.new(@template, object, attribute, label: label, hint: hint, required: required, **).render
    end

    def cads_button(button_text = "Save changes", **)
      Elements::Button.new(@template, object, button_text: button_text, **).render
    end

    # Custom method to display a list of errors where validation errors are present
    # f.cads_error_summary
    def cads_error_summary(options = {})
      Elements::ErrorSummary.new(
        self,
        @template,
        object,
        options
      ).render
    end

    def cads_check_box(attribute, label: nil, **)
      Elements::CheckBox.new(@template, object, attribute, label: label, **).render
    end
  end
end
