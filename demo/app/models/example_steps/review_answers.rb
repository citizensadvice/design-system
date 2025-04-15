# frozen_string_literal: true

module ExampleSteps
  class ReviewAnswers < WizardSteps::Step
    def answers_by_step
      @answers_by_step ||= @wizard.reviewable_answers_by_step
    end
  end
end
