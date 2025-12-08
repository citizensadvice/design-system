# frozen_string_literal: true

module CitizensAdviceComponents
  class FormBuilder < ActionView::Helpers::FormBuilder
    # Labelled text_field element
    # https://api.rubyonrails.org/classes/ActionView/Helpers/FormBuilder.html#method-i-text_field
    # f.cads_text_field(:name)
    def cads_text_field(attribute, **options)
      Elements::TextField.new(
        self,
        @template,
        object,
        attribute,
        options
      ).render
    end

    # Labelled text_area element
    # https://api.rubyonrails.org/classes/ActionView/Helpers/FormBuilder.html#method-i-textarea
    # f.cads_textarea(:address)
    def cads_textarea(attribute, **options)
      Elements::TextArea.new(
        self,
        @template,
        object,
        attribute,
        options
      ).render
    end
    alias cads_text_area cads_textarea

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

    # Button element
    # f.cads_button "Submit complaint", icon_right: :arrow_right
    def cads_button(button_text = "Save changes", **)
      Elements::Button.new(
        self,
        @template,
        object,
        button_text: button_text, **
      ).render
    end

    def cads_error_summary
      Elements::ErrorSummary.new(@template, object, :unused).render
    end

    def cads_check_box(attribute, label: nil, **)
      Elements::CheckBox.new(@template, object, attribute, label: label, **).render
    end
  end
end
