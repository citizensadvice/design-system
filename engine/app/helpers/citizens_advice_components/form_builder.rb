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

    # Labelled date field. Mirrors the native date_field but with the major distinction of rendering
    # a three-field date input with separate day, month, and year parts.
    # https://api.rubyonrails.org/classes/ActionView/Helpers/FormBuilder.html#method-i-date_field
    # f.cads_date_field(:date)
    def cads_date_field(attribute, **options)
      Elements::DateField.new(
        self,
        @template,
        object,
        attribute,
        options
      ).render
    end

    # Labelled collection_select element
    # https://api.rubyonrails.org/classes/ActionView/Helpers/FormBuilder.html#method-i-collection_select
    # f.cads_collection_select(:my_argument, Locations.all)
    def cads_collection_radio_buttons(
      attribute,
      collection_arg = nil,
      value_method_arg = nil,
      text_method_arg = nil,
      options = {},
      html_options = {}
    )
      Elements::CollectionRadioButtons.new(
        self,
        @template,
        object,
        attribute,
        collection_arg,
        value_method_arg,
        text_method_arg,
        options,
        html_options
      ).render
    end

    # Labelled collection_check_boxes element
    # https ://api.rubyonrails.org/classes/ActionView/Helpers/FormBuilder.html#method-i-collection_select
    # f.cads_collection_check_boxes(:my_argument, Locations.all, :id, :name)
    def cads_collection_check_boxes(
      attribute,
      collection_arg = nil,
      value_method_arg = nil,
      text_method_arg = nil,
      options = {},
      html_options = {}
    )
      Elements::CollectionCheckBoxes.new(
        self,
        @template,
        object,
        attribute,
        collection_arg,
        value_method_arg,
        text_method_arg,
        options,
        html_options
      ).render
    end

    # Labelled collection_select element
    # https ://api.rubyonrails.org/classes/ActionView/Helpers/FormBuilder.html#method-i-collection_select
    # f.cads_collection_select(:my_argument, Locations.all, :id, :name)
    def cads_collection_select(
      attribute,
      collection_arg = nil,
      value_method_arg = nil,
      text_method_arg = nil,
      options = {},
      html_options = {}
    )
      Elements::CollectionSelect.new(
        self,
        @template,
        object,
        attribute,
        collection_arg,
        value_method_arg,
        text_method_arg,
        options,
        html_options
      ).render
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
