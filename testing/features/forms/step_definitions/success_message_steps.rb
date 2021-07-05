# frozen_string_literal: true

Given("a Success Message form is on the page") do
  @form = SuccessMessage::Example.new.tap(&:load)
end

Then("a Success Message feedback is present") do
  expect(@form).to have_feedback
end
