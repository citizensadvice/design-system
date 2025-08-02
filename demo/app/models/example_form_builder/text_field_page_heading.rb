# frozen_string_literal: true

module ExampleFormBuilder
  class TextFieldPageHeading < WizardSteps::Step
    attribute :text_field_page_heading, :string

    validates :text_field_page_heading, presence: true
  end
end
