# frozen_string_literal: true

module ExampleSteps
  class TextArea < WizardSteps::Step
    attribute :text_area_default, :string
    attribute :text_area_required, :string
    attribute :text_area_with_hint, :string

    validates :text_area_required, presence: true
  end
end
