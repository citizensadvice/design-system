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
        object_name,
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
        object_name,
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
        object_name,
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
      html_options = {},
      # Add our own additional properties
      label: nil,
      hint: nil,
      required: false,
      page_heading: false,
      layout: nil,
      size: nil,
      # Deprecated options
      # This core collection_select method accepts collection, value_method, and text_method as
      # positional arguments as well as html_options for passing options to the HTML element,
      # but we historically accepted them as named arguments. Support both for backwards compatability
      collection: nil,
      value_method: nil,
      text_method: nil,
      additional_attributes: nil
    )
      Elements::CollectionRadioButtons.new(
        self,
        @template,
        object,
        object_name,
        attribute,
        collection_arg,
        value_method_arg,
        text_method_arg,
        options,
        html_options,
        label: label,
        hint: hint,
        required: required,
        page_heading: page_heading,
        layout: layout,
        size: size,
        collection_param: collection,
        value_method_param: value_method,
        text_method_param: text_method,
        additional_attributes: additional_attributes
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
      html_options = {},
      # Add our own additional properties
      label: nil,
      hint: nil,
      required: false,
      page_heading: false,
      # Deprecated options
      # This core collection_select method accepts collection, value_method, and text_method as
      # positional arguments as well as html_options for passing options to the HTML element,
      # but we historically accepted them as named arguments. Support both for backwards compatability
      collection: nil,
      value_method: nil,
      text_method: nil,
      additional_attributes: nil
    )
      Elements::CollectionCheckBoxes.new(
        self,
        @template,
        object,
        object_name,
        attribute,
        collection_arg,
        value_method_arg,
        text_method_arg,
        options,
        html_options,
        label: label,
        hint: hint,
        required: required,
        page_heading: page_heading,
        collection_param: collection,
        value_method_param: value_method,
        text_method_param: text_method,
        additional_attributes: additional_attributes
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
      html_options = {},
      # Add our own additional properties
      label: nil,
      hint: nil,
      required: false,
      # Deprecated options
      # This core collection_select method accepts collection, value_method, and text_method as
      # positional arguments as well as html_options for passing options to the HTML element,
      # but we historically accepted them as named arguments. Support both for backwards compatability
      collection: nil,
      value_method: nil,
      text_method: nil,
      additional_attributes: nil
    )
      Elements::CollectionSelect.new(
        self,
        @template,
        object,
        object_name,
        attribute,
        collection_arg,
        value_method_arg,
        text_method_arg,
        options,
        html_options,
        label: label,
        hint: hint,
        required: required,
        collection_param: collection,
        value_method_param: value_method,
        text_method_param: text_method,
        additional_attributes: additional_attributes
      ).render
    end

    def cads_button(button_text = "Save changes", **)
      Elements::Button.new(
        self,
        @template,
        object,
        object_name,
        button_text: button_text, **
      ).render
    end

    def cads_error_summary(options = {})
      Elements::ErrorSummary.new(
        self,
        @template,
        object,
        object_name,
        options
      ).render
    end

    def cads_check_box(attribute, label: nil, **)
      Elements::CheckBox.new(
        self,
        @template,
        object,
        object_name,
        attribute,
        label: label, **
      ).render
    end
  end
end
