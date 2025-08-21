# frozen_string_literal: true

module ExampleFormBuilder
  class TextFields < WizardSteps::Step
    attribute :text_field_default, :string
    attribute :text_field_width, :string

    validates :text_field_default, presence: true
  end
end
