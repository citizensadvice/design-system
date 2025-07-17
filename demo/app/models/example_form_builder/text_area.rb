# frozen_string_literal: true

module ExampleFormBuilder
  class TextArea < WizardSteps::Step
    attribute :text_area_default, :string
    attribute :text_area_custom, :string

    validates :text_area_default, presence: true
  end
end
